import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import BrandLogo from '../components/BrandLogo';
import { COLORS } from '../theme/colors';

const QUICK_ACTIONS = [
  { key: 'service', title: 'Book Service', hint: 'Estimate + coupons', screen: 'ServiceBooking' },
  { key: 'support', title: 'Support Hub', hint: 'FAQ + garage + emergency', screen: 'Support' },
  { key: 'profile', title: 'Car Profile', hint: 'Cars + reminders + rewards', tab: 'Profile' },
  { key: 'status', title: 'Track Booking', hint: 'Status timeline', tab: 'Bookings' }
];

export default function HomeScreen({ navigation }) {
  const [services, setServices] = useState([]);
  const [support, setSupport] = useState({ tips: [], coupons: [] });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
      api.get('/services').then(r => setServices(r.data.services || [])).catch(() => {});
      api.get('/support').then(r => setSupport(r.data || { tips: [], coupons: [] })).catch(() => {});
    };
    const unsubscribe = navigation.addListener('focus', load);
    load();
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <BrandLogo light compact />
        <Text style={styles.bannerTitle}>{user?.name ? `Hi ${user.name}!` : 'Car care made simple'}</Text>
        <Text style={styles.bannerSub}>
          Service history, reminders, rewards, pickup-drop, coupons aur support hub ab app me available hain.
        </Text>
        {!user ? (
          <TouchableOpacity style={styles.bannerBtn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.bannerBtnText}>Login / Demo Setup</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.grid}>
        {QUICK_ACTIONS.map(item => (
          <TouchableOpacity
            key={item.key}
            style={styles.actionCard}
            onPress={() => {
              if (item.screen) navigation.navigate(item.screen);
              if (item.tab) navigation.navigate(item.tab);
            }}
          >
            <Text style={styles.actionTitle}>{item.title}</Text>
            <Text style={styles.actionHint}>{item.hint}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.rewardCard}>
        <Text style={styles.rewardTitle}>Rewards & Offers</Text>
        <Text style={styles.rewardText}>
          {user ? `Wallet points: ${user.walletPoints || 0} • Balance: Rs ${user.walletBalance || 0}` : 'Login to unlock wallet and referral rewards'}
        </Text>
        <Text style={styles.couponText}>
          {support.coupons?.slice(0, 2).map(c => c.code).join(' • ') || 'WELCOME10 • FIRSTSERVICE'}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Our Services</Text>
      {services.map(service => (
        <TouchableOpacity
          key={service._id}
          style={styles.serviceCard}
          onPress={() => navigation.navigate('ServiceBooking', { serviceId: service._id })}
        >
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceDesc}>{service.description}</Text>
            <Text style={styles.serviceMeta}>{service.estimatedTime} • {service.category}</Text>
            <Text style={styles.price}>Rs {service.basePrice}</Text>
          </View>
          <View>
            <Text style={styles.bookBtn}>Book</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Car Care Tips</Text>
      {(support.tips || []).slice(0, 2).map(tip => (
        <View key={tip.id} style={styles.tipCard}>
          <Text style={styles.tipTitle}>{tip.title}</Text>
          <Text style={styles.tipBody}>{tip.body}</Text>
        </View>
      ))}
      <TouchableOpacity style={[styles.bannerBtn, { marginHorizontal: 12, marginBottom: 30 }]} onPress={() => navigation.navigate('Support')}>
        <Text style={styles.bannerBtnText}>Open Full Support Hub</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  banner: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  bannerTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 16,
    lineHeight: 30
  },
  bannerSub: { color: COLORS.textLight, marginTop: 8, lineHeight: 22 },
  bannerBtn: {
    alignSelf: 'flex-start',
    marginTop: 14,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999
  },
  bannerBtnText: { color: '#fff', fontWeight: '700' },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 12,
    marginTop: 16,
    marginBottom: 8,
    color: COLORS.text
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8
  },
  actionCard: {
    width: '50%',
    padding: 8
  },
  actionTitle: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 8,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    color: COLORS.text,
    fontWeight: '700'
  },
  actionHint: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingBottom: 16,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    color: COLORS.textLight,
    minHeight: 58
  },
  rewardCard: {
    backgroundColor: '#0F2A47',
    margin: 12,
    borderRadius: 16,
    padding: 18
  },
  rewardTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16
  },
  rewardText: {
    color: '#D7E7F6',
    marginTop: 8
  },
  couponText: {
    color: '#7DE4B4',
    marginTop: 8,
    fontWeight: '700'
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginBottom: 10,
    padding: 14,
    borderRadius: 14,
    alignItems: 'center'
  },
  serviceInfo: { flex: 1 },
  serviceName: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  serviceDesc: { color: COLORS.textLight, fontSize: 12, marginTop: 4, lineHeight: 18 },
  serviceMeta: { color: COLORS.textLight, fontSize: 12, marginTop: 6 },
  price: { color: COLORS.primary, marginTop: 6, fontWeight: '700' },
  bookBtn: { color: COLORS.primary, fontWeight: '700' },
  tipCard: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginBottom: 10,
    padding: 14,
    borderRadius: 14
  },
  tipTitle: { color: COLORS.text, fontWeight: '700' },
  tipBody: { color: COLORS.textLight, marginTop: 6, lineHeight: 20 }
});
