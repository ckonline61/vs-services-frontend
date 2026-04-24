import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import api from '../services/api';
import { COLORS } from '../theme/colors';

export default function AccessoriesScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then(r => setProducts(r.data.products || [])).catch(() => {});
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProductDetail', { product: item })}>
      <View style={styles.img}><Text style={{ fontSize: 30 }}>🚗</Text></View>
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.price}>₹{item.discountPrice || item.price}</Text>
      {item.discountPrice && <Text style={styles.strike}>₹{item.price}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('Cart')}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>🛒 View Cart</Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={i => i._id}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        ListEmptyComponent={<Text style={styles.empty}>No products available</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, margin: 6, backgroundColor: '#fff', borderRadius: 8, padding: 10 },
  img: { height: 100, backgroundColor: '#f0f0f0', borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  name: { fontWeight: '600', color: COLORS.text },
  price: { color: COLORS.primary, fontWeight: 'bold', marginTop: 4 },
  strike: { color: COLORS.textLight, textDecorationLine: 'line-through', fontSize: 12 },
  cartBtn: { backgroundColor: COLORS.primary, padding: 12, margin: 10, borderRadius: 8, alignItems: 'center' },
  empty: { textAlign: 'center', color: COLORS.textLight, padding: 40 }
});
