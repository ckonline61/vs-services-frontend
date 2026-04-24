import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import api from '../services/api';
import { hasToken } from '../services/authService';
import { COLORS } from '../theme/colors';

const MODES = [
  { key: 'at_garage', label: 'At Garage' },
  { key: 'home_service', label: 'Home Service' },
  { key: 'pickup_drop', label: 'Pickup & Drop' }
];

export default function ServiceBookingScreen({ route, navigation }) {
  const { serviceId, category } = route.params || {};
  const [services, setServices] = useState([]);
  const [selectedId, setSelectedId] = useState(serviceId);
  const [car, setCar] = useState({
    brand: '',
    model: '',
    carNumber: '',
    fuelType: 'Petrol',
    year: '',
    rcNumber: ''
  });
  const [bookingDate, setBookingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:00 AM');
  const [serviceMode, setServiceMode] = useState('at_garage');
  const [address, setAddress] = useState({ line1: '', city: '', pincode: '' });
  const [paymentMode, setPaymentMode] = useState('pay_on_service');
  const [couponCode, setCouponCode] = useState('');
  const [partsEstimate, setPartsEstimate] = useState('');
  const [sparePartsRequest, setSparePartsRequest] = useState('');
  const [inspectionPhotos, setInspectionPhotos] = useState('');
  const [estimate, setEstimate] = useState(null);

  useEffect(() => {
    const query = category ? `?category=${category}` : '';
    api.get(`/services${query}`).then((r) => {
      const list = r.data.services || [];
      setServices(list);
      if (serviceId) setSelectedId(serviceId);
      else if (list.length === 1) setSelectedId(list[0]._id);
    }).catch(() => {});

    api.get('/users/me').then((r) => {
      const firstCar = r.data.user?.cars?.[0];
      if (firstCar) {
        setCar({
          brand: firstCar.brand || '',
          model: firstCar.model || '',
          carNumber: firstCar.carNumber || '',
          fuelType: firstCar.fuelType || 'Petrol',
          year: firstCar.year ? String(firstCar.year) : '',
          rcNumber: firstCar.rcNumber || ''
        });
      }
    }).catch(() => {});
  }, [category, serviceId]);

  const calculateEstimate = async () => {
    if (!selectedId) return Alert.alert('Error', 'Please select a service');
    try {
      const { data } = await api.post('/bookings/estimate', {
        serviceId: selectedId,
        serviceMode,
        couponCode,
        partsEstimate: Number(partsEstimate || 0)
      });
      setEstimate(data.estimate);
    } catch (e) {
      Alert.alert('Error', e?.response?.data?.message || 'Estimate failed');
    }
  };

  const submit = async () => {
    if (!selectedId || !car.carNumber || !bookingDate) {
      return Alert.alert('Error', 'Please fill service, car number and date');
    }
    if (!(await hasToken())) {
      Alert.alert('Login required', 'Guest or demo login pehle complete karo.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Login', onPress: () => navigation.navigate('Login') }
      ]);
      return;
    }

    try {
      const { data } = await api.post('/bookings', {
        serviceId: selectedId,
        car: {
          ...car,
          year: car.year ? Number(car.year) : undefined
        },
        bookingDate,
        timeSlot,
        serviceMode,
        address: serviceMode === 'at_garage' ? undefined : address,
        paymentMode,
        couponCode,
        partsEstimate: Number(partsEstimate || 0),
        sparePartsRequest,
        inspectionPhotos: inspectionPhotos.split(',').map(x => x.trim()).filter(Boolean)
      });

      if (data.success) {
        if (paymentMode === 'online') {
          navigation.navigate('Payment', { booking: data.booking });
        } else {
          Alert.alert('Success', `Booking ${data.booking.bookingId} confirmed`);
          navigation.navigate('BookingDetail', { id: data.booking._id });
        }
      }
    } catch (e) {
      Alert.alert('Error', e?.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {category ? <Text style={styles.helper}>Showing {category} services</Text> : null}
      <Text style={styles.label}>Select Service</Text>
      {services.map(service => (
        <TouchableOpacity
          key={service._id}
          style={[styles.option, selectedId === service._id && styles.optionActive]}
          onPress={() => setSelectedId(service._id)}
        >
          <Text style={styles.optionTitle}>{service.name}</Text>
          <Text style={styles.optionSub}>{service.description}</Text>
          <Text style={styles.optionPrice}>Rs {service.basePrice}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>Car Profile</Text>
      <TextInput style={styles.input} placeholder="Brand" value={car.brand} onChangeText={v => setCar({ ...car, brand: v })} />
      <TextInput style={styles.input} placeholder="Model" value={car.model} onChangeText={v => setCar({ ...car, model: v })} />
      <TextInput style={styles.input} placeholder="Car Number" value={car.carNumber} autoCapitalize="characters" onChangeText={v => setCar({ ...car, carNumber: v })} />
      <View style={styles.row}>
        {['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'].map(fuel => (
          <TouchableOpacity
            key={fuel}
            style={[styles.chip, car.fuelType === fuel && styles.chipActive]}
            onPress={() => setCar({ ...car, fuelType: fuel })}
          >
            <Text style={car.fuelType === fuel ? styles.chipTextActive : undefined}>{fuel}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.rowBlock}>
        <TextInput style={[styles.input, styles.half]} placeholder="Year" value={car.year} onChangeText={v => setCar({ ...car, year: v })} />
        <TextInput style={[styles.input, styles.half]} placeholder="RC Number" value={car.rcNumber} onChangeText={v => setCar({ ...car, rcNumber: v })} />
      </View>

      <Text style={styles.label}>Date & Slot</Text>
      <TextInput style={styles.input} placeholder="YYYY-MM-DD" value={bookingDate} onChangeText={setBookingDate} />
      <View style={styles.row}>
        {['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'].map(slot => (
          <TouchableOpacity
            key={slot}
            style={[styles.chip, timeSlot === slot && styles.chipActive]}
            onPress={() => setTimeSlot(slot)}
          >
            <Text style={timeSlot === slot ? styles.chipTextActive : undefined}>{slot}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Service Mode</Text>
      <View style={styles.row}>
        {MODES.map(mode => (
          <TouchableOpacity
            key={mode.key}
            style={[styles.chip, serviceMode === mode.key && styles.chipActive]}
            onPress={() => setServiceMode(mode.key)}
          >
            <Text style={serviceMode === mode.key ? styles.chipTextActive : undefined}>{mode.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {serviceMode !== 'at_garage' && (
        <>
          <Text style={styles.label}>Address</Text>
          <TextInput style={styles.input} placeholder="Address line" value={address.line1} onChangeText={v => setAddress({ ...address, line1: v })} />
          <View style={styles.rowBlock}>
            <TextInput style={[styles.input, styles.half]} placeholder="City" value={address.city} onChangeText={v => setAddress({ ...address, city: v })} />
            <TextInput style={[styles.input, styles.half]} placeholder="Pincode" value={address.pincode} onChangeText={v => setAddress({ ...address, pincode: v })} />
          </View>
        </>
      )}

      <Text style={styles.label}>Offers & Notes</Text>
      <TextInput style={styles.input} placeholder="Coupon code (WELCOME10)" value={couponCode} onChangeText={setCouponCode} />
      <TextInput style={styles.input} placeholder="Estimated parts cost" value={partsEstimate} keyboardType="number-pad" onChangeText={setPartsEstimate} />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Spare parts request"
        value={sparePartsRequest}
        multiline
        onChangeText={setSparePartsRequest}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Inspection photo URLs (comma separated)"
        value={inspectionPhotos}
        multiline
        onChangeText={setInspectionPhotos}
      />

      <Text style={styles.label}>Payment</Text>
      <View style={styles.row}>
        {[{ key: 'pay_on_service', label: 'Cash / UPI / Garage' }, { key: 'online', label: 'Demo Online' }].map(item => (
          <TouchableOpacity
            key={item.key}
            style={[styles.chip, paymentMode === item.key && styles.chipActive]}
            onPress={() => setPaymentMode(item.key)}
          >
            <Text style={paymentMode === item.key ? styles.chipTextActive : undefined}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={[styles.submit, styles.secondaryBtn]} onPress={calculateEstimate}>
        <Text style={[styles.submitText, styles.secondaryBtnText]}>Calculate Estimate</Text>
      </TouchableOpacity>

      {estimate ? (
        <View style={styles.estimateCard}>
          <Text style={styles.optionTitle}>Estimated Total</Text>
          <Text style={styles.optionSub}>Base: Rs {estimate.basePrice}</Text>
          <Text style={styles.optionSub}>Pickup/Home: Rs {(estimate.pickupCharge || 0) + (estimate.homeVisitCharge || 0)}</Text>
          <Text style={styles.optionSub}>Parts: Rs {estimate.partsEstimate}</Text>
          <Text style={styles.optionSub}>Discount: Rs {estimate.discount}</Text>
          <Text style={styles.optionPrice}>Final: Rs {estimate.finalAmount}</Text>
        </View>
      ) : null}

      <TouchableOpacity style={styles.submit} onPress={submit}>
        <Text style={styles.submitText}>Confirm Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 14, backgroundColor: COLORS.bg },
  helper: { color: COLORS.textLight, marginBottom: 4 },
  label: { fontWeight: '700', marginTop: 14, marginBottom: 6, color: COLORS.text },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8
  },
  textArea: { minHeight: 82, textAlignVertical: 'top' },
  option: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  optionActive: { borderColor: COLORS.primary, backgroundColor: '#EEF6FC' },
  optionTitle: { color: COLORS.text, fontWeight: '700' },
  optionSub: { color: COLORS.textLight, marginTop: 4, lineHeight: 18 },
  optionPrice: { color: COLORS.primary, marginTop: 8, fontWeight: '700' },
  row: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 4 },
  rowBlock: { flexDirection: 'row', gap: 8 },
  half: { flex: 1 },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    margin: 4,
    backgroundColor: '#fff'
  },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipTextActive: { color: '#fff' },
  estimateCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  submit: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 40
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  secondaryBtn: { backgroundColor: '#fff', borderWidth: 1, borderColor: COLORS.primary, marginBottom: 0 },
  secondaryBtnText: { color: COLORS.primary }
});
