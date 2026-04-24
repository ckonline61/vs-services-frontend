import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';
import api from '../services/api';
import { COLORS } from '../theme/colors';

export default function SupportScreen() {
  const [data, setData] = useState({
    branches: [],
    emergency: [],
    faq: [],
    tips: [],
    packages: [],
    coupons: []
  });

  useEffect(() => {
    api.get('/support').then(r => setData(r.data || {})).catch(() => {});
  }, []);

  const call = (phone) => Linking.openURL(`tel:${phone.replace(/\s+/g, '')}`);
  const openMap = (url) => Linking.openURL(url);
  const whatsapp = () => Linking.openURL('https://wa.me/918839533202?text=Hi%20I%20need%20car%20service%20help');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.section}>Nearby Garage</Text>
      {data.branches.map(branch => (
        <View key={branch.id} style={styles.card}>
          <Text style={styles.title}>{branch.name}</Text>
          <Text style={styles.body}>{branch.address}</Text>
          <Text style={styles.meta}>{branch.timings}</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.btn} onPress={() => call(branch.phone)}>
              <Text style={styles.btnText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.secondary]} onPress={() => openMap(branch.mapUrl)}>
              <Text style={[styles.btnText, styles.secondaryText]}>Map</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Text style={styles.section}>Emergency Help</Text>
      {data.emergency.map(item => (
        <TouchableOpacity key={item.id} style={styles.card} onPress={() => call(item.phone)}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>ETA: {item.eta}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.section}>Car Care Tips</Text>
      {data.tips.map(tip => (
        <View key={tip.id} style={styles.card}>
          <Text style={styles.title}>{tip.title}</Text>
          <Text style={styles.body}>{tip.body}</Text>
        </View>
      ))}

      <Text style={styles.section}>FAQ</Text>
      {data.faq.map((item, index) => (
        <View key={`${item.q}-${index}`} style={styles.card}>
          <Text style={styles.title}>{item.q}</Text>
          <Text style={styles.body}>{item.a}</Text>
        </View>
      ))}

      <Text style={styles.section}>Packages & Coupons</Text>
      {data.packages.map(item => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.title}>{item.name} • Rs {item.price}</Text>
          <Text style={styles.body}>{item.benefits.join(', ')}</Text>
        </View>
      ))}
      {data.coupons.map(item => (
        <View key={item.code} style={styles.card}>
          <Text style={styles.title}>{item.code}</Text>
          <Text style={styles.body}>{item.description}</Text>
          <Text style={styles.meta}>{item.value}</Text>
        </View>
      ))}

      <TouchableOpacity style={[styles.btn, { margin: 16 }]} onPress={whatsapp}>
        <Text style={styles.btnText}>Chat on WhatsApp</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  section: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
    padding: 16
  },
  title: { fontWeight: '700', color: COLORS.text },
  body: { color: COLORS.textLight, marginTop: 6, lineHeight: 20 },
  meta: { color: COLORS.primary, marginTop: 8, fontWeight: '600' },
  row: { flexDirection: 'row', gap: 10, marginTop: 12 },
  btn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center'
  },
  btnText: { color: '#fff', fontWeight: '700' },
  secondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.primary
  },
  secondaryText: { color: COLORS.primary }
});
