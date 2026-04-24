import React, { useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BrandLogo from '../components/BrandLogo';
import api from '../services/api';
import { hasToken, logout } from '../services/authService';
import { COLORS } from '../theme/colors';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [rewards, setRewards] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [newCar, setNewCar] = useState({
    brand: '',
    model: '',
    carNumber: '',
    fuelType: 'Petrol',
    year: '',
    rcNumber: '',
    insuranceExpiry: '',
    pucExpiry: ''
  });
  const [newReminder, setNewReminder] = useState({
    title: '',
    type: 'service',
    dueDate: '',
    note: ''
  });
  const [lang, setLang] = useState('en');
  const [reminderOptIn, setReminderOptIn] = useState(true);

  const load = async () => {
    const loggedIn = await hasToken();
    setIsAuth(loggedIn);
    if (!loggedIn) {
      setUser(null);
      setHistory([]);
      setReminders([]);
      setRewards(null);
      return;
    }
    const [me, historyRes, reminderRes, rewardRes] = await Promise.all([
      api.get('/users/me'),
      api.get('/users/history'),
      api.get('/users/reminders'),
      api.get('/users/rewards')
    ]);
    const meUser = me.data.user;
    setUser(meUser);
    setProfile({ name: meUser.name || '', email: meUser.email || '' });
    setHistory(historyRes.data.history || []);
    setReminders(reminderRes.data.reminders || []);
    setRewards(rewardRes.data.rewards || null);
    setLang(meUser.preferredLanguage || 'en');
    setReminderOptIn(meUser.reminderOptIn !== false);
  };

  useFocusEffect(useCallback(() => {
    load().catch(() => {});
  }, []));

  const save = async () => {
    const { data } = await api.put('/users/me', {
      ...profile,
      preferredLanguage: lang,
      reminderOptIn
    });
    setUser(data.user);
    Alert.alert('Saved', 'Profile updated');
  };

  const addCar = async () => {
    if (!newCar.carNumber) return Alert.alert('Error', 'Car number required');
    const { data } = await api.post('/users/cars', {
      ...newCar,
      year: newCar.year ? Number(newCar.year) : undefined
    });
    setUser(prev => ({ ...prev, cars: data.cars }));
    setNewCar({
      brand: '',
      model: '',
      carNumber: '',
      fuelType: 'Petrol',
      year: '',
      rcNumber: '',
      insuranceExpiry: '',
      pucExpiry: ''
    });
  };

  const removeCar = async (id) => {
    const { data } = await api.delete(`/users/cars/${id}`);
    setUser(prev => ({ ...prev, cars: data.cars || [] }));
  };

  const addReminder = async () => {
    if (!newReminder.title || !newReminder.dueDate) {
      return Alert.alert('Error', 'Reminder title and due date required');
    }
    const { data } = await api.post('/users/reminders', newReminder);
    setReminders(data.reminders || []);
    setNewReminder({ title: '', type: 'service', dueDate: '', note: '' });
  };

  const handleLogout = async () => {
    await logout();
    setIsAuth(false);
    navigation.navigate('Main');
  };

  if (!isAuth) {
    return (
      <ScrollView contentContainerStyle={styles.guestWrap} style={styles.container}>
        <View style={styles.guestCard}>
          <BrandLogo />
          <Text style={styles.guestTitle}>Profile baad me bhi bana sakte ho</Text>
          <Text style={styles.guestText}>
            Guest login se booking, car profile, reminders aur rewards sab unlock ho jayega.
          </Text>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btnText}>Login / Demo Setup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{profile.name || 'Guest'}</Text>
        <Text style={styles.mobile}>+91 {user?.mobile}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.section}>Profile & Preferences</Text>
        <TextInput style={styles.input} placeholder="Name" value={profile.name} onChangeText={v => setProfile({ ...profile, name: v })} />
        <TextInput style={styles.input} placeholder="Email" value={profile.email} onChangeText={v => setProfile({ ...profile, email: v })} />
        <View style={styles.row}>
          <TouchableOpacity style={[styles.pill, lang === 'en' && styles.pillActive]} onPress={() => setLang('en')}>
            <Text style={lang === 'en' ? styles.pillTextActive : styles.pillText}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.pill, lang === 'hi' && styles.pillActive]} onPress={() => setLang('hi')}>
            <Text style={lang === 'hi' ? styles.pillTextActive : styles.pillText}>Hindi</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Service reminders enabled</Text>
          <Switch value={reminderOptIn} onValueChange={setReminderOptIn} />
        </View>
        <TouchableOpacity style={styles.btn} onPress={save}><Text style={styles.btnText}>Save Profile</Text></TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.section}>Rewards</Text>
        <Text style={styles.rewardText}>Wallet Points: {rewards?.walletPoints || 0}</Text>
        <Text style={styles.rewardText}>Wallet Balance: Rs {rewards?.walletBalance || 0}</Text>
        <Text style={styles.rewardText}>Referral Code: {rewards?.referralCode || '-'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.section}>Car Profile</Text>
        {(user?.cars || []).map(car => (
          <View key={car._id} style={styles.carCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.carTitle}>{car.brand} {car.model}</Text>
              <Text style={styles.carMeta}>{car.carNumber} • {car.fuelType}</Text>
              <Text style={styles.carMeta}>RC: {car.rcNumber || '-'} • Insurance: {car.insuranceExpiry ? new Date(car.insuranceExpiry).toDateString() : '-'}</Text>
            </View>
            <TouchableOpacity onPress={() => removeCar(car._id)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TextInput style={styles.input} placeholder="Brand" value={newCar.brand} onChangeText={v => setNewCar({ ...newCar, brand: v })} />
        <TextInput style={styles.input} placeholder="Model" value={newCar.model} onChangeText={v => setNewCar({ ...newCar, model: v })} />
        <TextInput style={styles.input} placeholder="Car Number" value={newCar.carNumber} autoCapitalize="characters" onChangeText={v => setNewCar({ ...newCar, carNumber: v })} />
        <View style={styles.row}>
          {['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'].map(fuel => (
            <TouchableOpacity key={fuel} style={[styles.pill, newCar.fuelType === fuel && styles.pillActive]} onPress={() => setNewCar({ ...newCar, fuelType: fuel })}>
              <Text style={newCar.fuelType === fuel ? styles.pillTextActive : styles.pillText}>{fuel}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput style={styles.input} placeholder="Year" value={newCar.year} onChangeText={v => setNewCar({ ...newCar, year: v })} />
        <TextInput style={styles.input} placeholder="RC Number" value={newCar.rcNumber} onChangeText={v => setNewCar({ ...newCar, rcNumber: v })} />
        <TextInput style={styles.input} placeholder="Insurance Expiry (YYYY-MM-DD)" value={newCar.insuranceExpiry} onChangeText={v => setNewCar({ ...newCar, insuranceExpiry: v })} />
        <TextInput style={styles.input} placeholder="PUC Expiry (YYYY-MM-DD)" value={newCar.pucExpiry} onChangeText={v => setNewCar({ ...newCar, pucExpiry: v })} />
        <TouchableOpacity style={styles.btn} onPress={addCar}><Text style={styles.btnText}>Add Car</Text></TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.section}>Service Reminders</Text>
        {reminders.map(reminder => (
          <View key={reminder._id} style={styles.historyCard}>
            <Text style={styles.historyTitle}>{reminder.title}</Text>
            <Text style={styles.historyMeta}>{reminder.type} • {new Date(reminder.dueDate).toDateString()}</Text>
            <Text style={styles.historyMeta}>{reminder.note}</Text>
          </View>
        ))}
        <TextInput style={styles.input} placeholder="Reminder title" value={newReminder.title} onChangeText={v => setNewReminder({ ...newReminder, title: v })} />
        <TextInput style={styles.input} placeholder="Type (service / insurance / puc)" value={newReminder.type} onChangeText={v => setNewReminder({ ...newReminder, type: v })} />
        <TextInput style={styles.input} placeholder="Due date YYYY-MM-DD" value={newReminder.dueDate} onChangeText={v => setNewReminder({ ...newReminder, dueDate: v })} />
        <TextInput style={styles.input} placeholder="Note" value={newReminder.note} onChangeText={v => setNewReminder({ ...newReminder, note: v })} />
        <TouchableOpacity style={styles.btn} onPress={addReminder}><Text style={styles.btnText}>Add Reminder</Text></TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.section}>Service History</Text>
        {history.map(item => (
          <View key={item.id} style={styles.historyCard}>
            <Text style={styles.historyTitle}>{item.serviceName}</Text>
            <Text style={styles.historyMeta}>{new Date(item.bookingDate).toDateString()} • {item.status}</Text>
            {item.estimatedNextServiceDue ? (
              <Text style={styles.historyMeta}>Next due: {new Date(item.estimatedNextServiceDue).toDateString()}</Text>
            ) : null}
          </View>
        ))}
      </View>

      <TouchableOpacity style={[styles.btn, { marginHorizontal: 14 }]} onPress={() => navigation.navigate('Support')}>
        <Text style={styles.btnText}>Open Support Hub</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, { backgroundColor: COLORS.error, margin: 14 }]} onPress={handleLogout}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    backgroundColor: COLORS.primary,
    margin: 14,
    padding: 20,
    borderRadius: 14,
    alignItems: 'center'
  },
  name: { color: '#fff', fontSize: 22, fontWeight: '700' },
  mobile: { color: '#fff', marginTop: 4 },
  guestWrap: { flexGrow: 1, justifyContent: 'center', paddingVertical: 40 },
  guestCard: { backgroundColor: '#fff', borderRadius: 16, padding: 22, margin: 16 },
  guestTitle: { fontSize: 20, fontWeight: '700', color: COLORS.text, marginTop: 22 },
  guestText: { color: COLORS.textLight, marginTop: 10, lineHeight: 22 },
  card: { backgroundColor: '#fff', marginHorizontal: 14, marginBottom: 12, borderRadius: 14, padding: 14 },
  section: { fontWeight: '700', color: COLORS.text, marginBottom: 10, fontSize: 16 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: COLORS.border, padding: 12, borderRadius: 10, marginBottom: 8 },
  btn: { backgroundColor: COLORS.primary, padding: 14, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
  rewardText: { color: COLORS.textLight, lineHeight: 22 },
  row: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  pill: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8
  },
  pillActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  pillText: { color: COLORS.text },
  pillTextActive: { color: '#fff' },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 },
  switchLabel: { color: COLORS.text },
  carCard: { backgroundColor: '#F7FBFE', padding: 12, borderRadius: 10, marginBottom: 8, flexDirection: 'row', alignItems: 'center' },
  carTitle: { fontWeight: '700', color: COLORS.text },
  carMeta: { color: COLORS.textLight, marginTop: 4, fontSize: 12 },
  removeText: { color: COLORS.error, fontWeight: '700' },
  historyCard: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#EDF2F7' },
  historyTitle: { fontWeight: '700', color: COLORS.text },
  historyMeta: { color: COLORS.textLight, marginTop: 4, fontSize: 12 }
});
