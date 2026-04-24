import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import api from '../services/api';
import { COLORS } from '../theme/colors';

export default function PaymentScreen({ route, navigation }) {
  const { booking, order, clearCartOnSuccess } = route.params || {};
  const target = booking || order;
  const amount = target?.totalAmount || 0;

  const startPayment = async () => {
    try {
      const userRaw = await AsyncStorage.getItem('user');
      const user = userRaw ? JSON.parse(userRaw) : null;
      const { data } = await api.post('/payments/create-order', {
        bookingId: booking?._id,
        orderId: order?._id
      });

      const options = {
        description: 'VS SERVICES Payment',
        currency: 'INR',
        key: data.key,
        amount: data.amount,
        name: 'VS SERVICES',
        order_id: data.razorpayOrderId,
        prefill: { email: user?.email || '', contact: user?.mobile || '', name: user?.name || '' },
        theme: { color: COLORS.primary }
      };

      const finalizeSuccess = async (payload) => {
        await api.post('/payments/verify', payload);
        if (clearCartOnSuccess) {
          await AsyncStorage.removeItem('cart');
        }
        Alert.alert('Success', data.isMock ? 'Demo payment marked successful!' : 'Payment Successful!');
        navigation.navigate('Main');
      };

      if (data.isMock) {
        await finalizeSuccess({
          razorpayOrderId: data.razorpayOrderId,
          razorpayPaymentId: `mock_payment_${Date.now()}`,
          razorpaySignature: 'mock_signature',
          paymentId: data.paymentId
        });
        return;
      }

      RazorpayCheckout.open(options)
        .then(async (rp) => {
          await finalizeSuccess({
            razorpayOrderId: rp.razorpay_order_id,
            razorpayPaymentId: rp.razorpay_payment_id,
            razorpaySignature: rp.razorpay_signature,
            paymentId: data.paymentId
          });
        })
        .catch((e) => Alert.alert('Failed', e.description || 'Cancelled'));
    } catch (e) {
      Alert.alert('Error', e?.response?.data?.message || 'Payment init failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Summary</Text>
      <Text style={styles.amount}>Rs {amount}</Text>
      <Text style={styles.sub}>{booking ? `Booking: ${booking.bookingId}` : `Order: ${order?.orderId}`}</Text>
      <Text style={styles.note}>Razorpay keys configured honge to live online payment chalega, warna demo mock flow use hoga.</Text>
      <TouchableOpacity style={styles.btn} onPress={startPayment}>
        <Text style={styles.btnText}>Pay with Razorpay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 20, color: COLORS.textLight },
  amount: { fontSize: 44, fontWeight: 'bold', color: COLORS.primary, marginVertical: 16 },
  sub: { color: COLORS.textLight, marginBottom: 30 },
  note: { color: COLORS.textLight, textAlign: 'center', marginBottom: 18 },
  btn: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 8, width: '80%', alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
