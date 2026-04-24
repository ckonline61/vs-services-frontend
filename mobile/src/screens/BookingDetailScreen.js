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
import { COLORS } from '../theme/colors';

export default function BookingDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [booking, setBooking] = useState(null);
  const [review, setReview] = useState({ rating: '5', comment: '' });

  const load = () => api.get(`/bookings/${id}`).then(r => setBooking(r.data.booking));

  useEffect(() => { load(); }, [id]);

  const cancel = async () => {
    await api.put(`/bookings/${id}/cancel`);
    Alert.alert('Cancelled', 'Booking cancelled');
    load();
  };

  const payNow = () => navigation.navigate('Payment', { booking });

  const submitReview = async () => {
    await api.post(`/bookings/${id}/review`, {
      rating: Number(review.rating),
      comment: review.comment
    });
    Alert.alert('Thanks', 'Review submitted');
    load();
  };

  const downloadInvoice = async () => {
    const { data } = await api.get(`/bookings/${id}/invoice`);
    Alert.alert('Invoice Ready', `${data.invoice.invoiceNo}\n${data.invoice.service}\nRs ${data.invoice.totalAmount}`);
  };

  if (!booking) return <View style={styles.container}><Text>Loading...</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.bid}>{booking.bookingId}</Text>
      <Text style={styles.status}>Status: {String(booking.status).toUpperCase()}</Text>

      <View style={styles.card}>
        <Row label="Service" value={booking.serviceId?.name} />
        <Row label="Date" value={new Date(booking.bookingDate).toDateString()} />
        <Row label="Time" value={booking.timeSlot} />
        <Row label="Mode" value={booking.serviceMode} />
        <Row label="Car" value={`${booking.car?.brand || ''} ${booking.car?.model || ''} (${booking.car?.carNumber || '-'})`} />
        <Row label="Amount" value={`Rs ${booking.totalAmount}`} />
        <Row label="Payment" value={`${booking.paymentMode} • ${booking.paymentStatus}`} />
        {booking.estimatedNextServiceDue ? (
          <Row label="Next Service Due" value={new Date(booking.estimatedNextServiceDue).toDateString()} />
        ) : null}
      </View>

      {booking.estimate ? (
        <View style={styles.card}>
          <Text style={styles.blockTitle}>Estimate</Text>
          <Row label="Base" value={`Rs ${booking.estimate.basePrice}`} />
          <Row label="Pickup / Home" value={`Rs ${(booking.estimate.pickupCharge || 0) + (booking.estimate.homeVisitCharge || 0)}`} />
          <Row label="Discount" value={`Rs ${booking.estimate.discount || 0}`} />
          <Row label="Final" value={`Rs ${booking.estimate.finalAmount || booking.totalAmount}`} />
        </View>
      ) : null}

      {booking.statusTimeline?.length ? (
        <View style={styles.card}>
          <Text style={styles.blockTitle}>Status Timeline</Text>
          {booking.statusTimeline.map((item, index) => (
            <View key={`${item.status}-${index}`} style={styles.timelineItem}>
              <Text style={styles.timelineTitle}>{item.status}</Text>
              <Text style={styles.timelineMeta}>{item.note}</Text>
              <Text style={styles.timelineMeta}>{new Date(item.at).toLocaleString()}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {booking.review ? (
        <View style={styles.card}>
          <Text style={styles.blockTitle}>Review</Text>
          <Text style={styles.timelineTitle}>{'★'.repeat(booking.review.rating)}{'☆'.repeat(5 - booking.review.rating)}</Text>
          <Text style={styles.timelineMeta}>{booking.review.comment}</Text>
        </View>
      ) : null}

      {booking.paymentStatus !== 'paid' && booking.paymentMode === 'online' && (
        <TouchableOpacity style={styles.btn} onPress={payNow}>
          <Text style={styles.btnText}>Pay Now</Text>
        </TouchableOpacity>
      )}
      {['booked', 'confirmed'].includes(booking.status) && (
        <TouchableOpacity style={[styles.btn, { backgroundColor: COLORS.error }]} onPress={cancel}>
          <Text style={styles.btnText}>Cancel Booking</Text>
        </TouchableOpacity>
      )}
      {booking.status === 'completed' && !booking.review ? (
        <View style={styles.card}>
          <Text style={styles.blockTitle}>Rate Service</Text>
          <TextInput style={styles.input} placeholder="Rating 1-5" value={review.rating} onChangeText={v => setReview({ ...review, rating: v })} />
          <TextInput style={[styles.input, styles.textArea]} placeholder="Feedback" value={review.comment} onChangeText={v => setReview({ ...review, comment: v })} multiline />
          <TouchableOpacity style={[styles.btn, { marginTop: 8 }]} onPress={submitReview}>
            <Text style={styles.btnText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <TouchableOpacity style={[styles.btn, styles.secondaryBtn]} onPress={downloadInvoice}>
        <Text style={[styles.btnText, styles.secondaryText]}>Invoice</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const Row = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.lbl}>{label}</Text>
    <Text style={styles.val}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 14, backgroundColor: COLORS.bg },
  bid: { fontSize: 22, fontWeight: '700', color: COLORS.primary },
  status: { color: COLORS.textLight, marginBottom: 14 },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 12, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#EDF2F7' },
  lbl: { color: COLORS.textLight, flex: 1 },
  val: { fontWeight: '700', color: COLORS.text, flex: 1, textAlign: 'right' },
  btn: { backgroundColor: COLORS.primary, padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 12 },
  btnText: { color: '#fff', fontWeight: '700' },
  blockTitle: { fontWeight: '700', color: COLORS.text, marginBottom: 8, fontSize: 16 },
  timelineItem: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#EDF2F7' },
  timelineTitle: { fontWeight: '700', color: COLORS.text },
  timelineMeta: { color: COLORS.textLight, marginTop: 4, lineHeight: 18 },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, padding: 12, marginBottom: 8 },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  secondaryBtn: { backgroundColor: '#fff', borderWidth: 1, borderColor: COLORS.primary },
  secondaryText: { color: COLORS.primary }
});
