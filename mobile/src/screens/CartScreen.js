import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { hasToken } from '../services/authService';
import { COLORS } from '../theme/colors';

export default function CartScreen({ navigation }) {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({ line1: '', city: '', pincode: '' });
  const [paymentMode, setPaymentMode] = useState('cod');

  const load = async () => setCart(JSON.parse(await AsyncStorage.getItem('cart') || '[]'));
  useEffect(() => { load(); }, []);

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const remove = async (id) => {
    const updated = cart.filter(c => c.productId !== id);
    await AsyncStorage.setItem('cart', JSON.stringify(updated));
    setCart(updated);
  };

  const placeOrder = async () => {
    if (!address.line1) return Alert.alert('Error', 'Enter address');
    if (!(await hasToken())) {
      Alert.alert('Login required', 'Order place karne se pehle OTP login karna hoga.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Login', onPress: () => navigation.navigate('Login') }
      ]);
      return;
    }
    try {
      const { data } = await api.post('/orders', {
        items: cart.map(c => ({ productId: c.productId, quantity: c.quantity })),
        shippingAddress: address,
        paymentMode
      });
      if (data.success) {
        if (paymentMode === 'online') {
          navigation.navigate('Payment', {
            order: data.order,
            clearCartOnSuccess: true
          });
        }
        else {
          await AsyncStorage.removeItem('cart');
          setCart([]);
          Alert.alert('Success', `Order ${data.order.orderId} placed!`);
          navigation.navigate('Main');
        }
      }
    } catch (e) {
      Alert.alert('Error', e?.response?.data?.message || 'Order failed');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={i => i.productId}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>₹{item.price} × {item.quantity}</Text>
            </View>
            <TouchableOpacity onPress={() => remove(item.productId)}>
              <Text style={{ color: COLORS.error }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Cart is empty</Text>}
      />
      {cart.length > 0 && (
        <View style={styles.checkout}>
          <Text style={styles.total}>Total: ₹{total}</Text>
          <TextInput style={styles.input} placeholder="Address" value={address.line1} onChangeText={v => setAddress({ ...address, line1: v })} />
          <TextInput style={styles.input} placeholder="City" value={address.city} onChangeText={v => setAddress({ ...address, city: v })} />
          <TextInput style={styles.input} placeholder="Pincode" value={address.pincode} keyboardType="number-pad" onChangeText={v => setAddress({ ...address, pincode: v })} />
          <View style={{ flexDirection: 'row' }}>
            {['cod', 'online'].map(m => (
              <TouchableOpacity key={m} style={[styles.chip, paymentMode === m && styles.chipActive]} onPress={() => setPaymentMode(m)}>
                <Text style={paymentMode === m ? { color: '#fff' } : {}}>{m === 'cod' ? 'Cash on Delivery' : 'Pay Online'}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.btn} onPress={placeOrder}>
            <Text style={styles.btnText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  row: { flexDirection: 'row', backgroundColor: '#fff', padding: 14, margin: 6, borderRadius: 8 },
  name: { fontWeight: '600' },
  empty: { textAlign: 'center', padding: 40, color: COLORS.textLight },
  checkout: { backgroundColor: '#fff', padding: 14, borderTopWidth: 1, borderColor: COLORS.border },
  total: { fontWeight: 'bold', fontSize: 18, marginBottom: 10, color: COLORS.text },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 6, padding: 8, marginBottom: 6 },
  chip: { padding: 10, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border, margin: 4 },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  btn: { backgroundColor: COLORS.primary, padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold' }
});
