import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BrandLogo from '../components/BrandLogo';
import api from '../services/api';
import { hasToken } from '../services/authService';
import { COLORS } from '../theme/colors';

const STATUS_COLOR = {
  booked: '#1976D2',
  confirmed: '#388E3C',
  assigned: '#F57C00',
  pickup_scheduled: '#00838F',
  in_progress: '#7B1FA2',
  completed: '#2E7D32',
  cancelled: '#C62828'
};

export default function BookingsScreen({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const [history, setHistory] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  useFocusEffect(useCallback(() => {
    hasToken().then((loggedIn) => {
      setIsAuth(loggedIn);
      if (!loggedIn) {
        setBookings([]);
        setHistory([]);
        return;
      }
      api.get('/bookings/my').then(r => setBookings(r.data.bookings || [])).catch(() => {});
      api.get('/users/history').then(r => setHistory(r.data.history || [])).catch(() => {});
    });
  }, []));

  if (!isAuth) {
    return (
      <View style={styles.guestWrap}>
        <BrandLogo compact />
        <Text style={styles.guestTitle}>Bookings login ke baad dikhengi</Text>
        <Text style={styles.guestText}>
          Demo login ya guest setup ke baad booking status, history aur next service due sab visible hoga.
        </Text>
        <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginBtnText}>Login To Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: COLORS.bg }}
      data={[...bookings, ...history.filter(item => !bookings.some(b => b._id === item.id))]}
      keyExtractor={(item, index) => item._id || item.id || String(index)}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => item._id && navigation.navigate('BookingDetail', { id: item._id })}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.bid}>{item.bookingId || 'History'}</Text>
            <Text style={styles.name}>{item.serviceId?.name || item.serviceName}</Text>
            <Text style={styles.sub}>{new Date(item.bookingDate).toDateString()}</Text>
            <Text style={styles.sub}>{item.totalAmount ? `Rs ${item.totalAmount}` : item.amount ? `Rs ${item.amount}` : ''}</Text>
            {item.estimatedNextServiceDue ? (
              <Text style={styles.nextDue}>Next due: {new Date(item.estimatedNextServiceDue).toDateString()}</Text>
            ) : null}
          </View>
          <Text style={[styles.status, { color: STATUS_COLOR[item.status] || COLORS.textLight }]}>
            {String(item.status || '').toUpperCase()}
          </Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={<Text style={styles.empty}>No bookings yet</Text>}
      ListHeaderComponent={
        <View style={styles.headCard}>
          <Text style={styles.headTitle}>Booking Status Tracking</Text>
          <Text style={styles.headText}>
            Pending, confirmed, in progress, completed aur cancelled states ab track ho rahi hain.
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 12, marginBottom: 10, padding: 14, borderRadius: 14 },
  bid: { fontWeight: '700', color: COLORS.primary },
  name: { fontSize: 16, fontWeight: '700', marginTop: 4, color: COLORS.text },
  sub: { color: COLORS.textLight, fontSize: 12, marginTop: 2 },
  nextDue: { color: COLORS.success, fontSize: 12, marginTop: 6, fontWeight: '600' },
  status: { fontSize: 11, fontWeight: '700' },
  empty: { textAlign: 'center', padding: 40, color: COLORS.textLight },
  guestWrap: { flex: 1, backgroundColor: COLORS.bg, alignItems: 'center', justifyContent: 'center', padding: 24 },
  guestTitle: { fontSize: 20, fontWeight: '700', color: COLORS.text, marginTop: 20 },
  guestText: { color: COLORS.textLight, textAlign: 'center', lineHeight: 22, marginTop: 10, marginBottom: 18 },
  loginBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 18, paddingVertical: 12, borderRadius: 999 },
  loginBtnText: { color: '#fff', fontWeight: '700' },
  headCard: { backgroundColor: '#0F2A47', margin: 12, padding: 16, borderRadius: 16 },
  headTitle: { color: '#fff', fontWeight: '700', fontSize: 16 },
  headText: { color: '#CFE1EE', marginTop: 8, lineHeight: 20 }
});
