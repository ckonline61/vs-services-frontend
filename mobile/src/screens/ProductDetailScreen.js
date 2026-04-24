import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../theme/colors';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;

  const addToCart = async () => {
    const cart = JSON.parse(await AsyncStorage.getItem('cart') || '[]');
    const existing = cart.find(c => c.productId === product._id);
    if (existing) existing.quantity += 1;
    else cart.push({ productId: product._id, name: product.name, price: product.discountPrice || product.price, quantity: 1 });
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
    Alert.alert('Added', `${product.name} added to cart`);
  };

  const buyNow = async () => {
    await addToCart();
    navigation.navigate('Cart');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imgBox}><Text style={{ fontSize: 80 }}>🚗</Text></View>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>₹{product.discountPrice || product.price}</Text>
      {product.discountPrice && <Text style={styles.strike}>₹{product.price}</Text>}
      <Text style={styles.desc}>{product.description}</Text>

      <TouchableOpacity style={styles.btn} onPress={addToCart}>
        <Text style={styles.btnText}>Add to Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, { backgroundColor: COLORS.primaryDark }]} onPress={buyNow}>
        <Text style={styles.btnText}>Buy Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  imgBox: { height: 220, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center', borderRadius: 10 },
  name: { fontSize: 22, fontWeight: 'bold', marginTop: 12, color: COLORS.text },
  price: { fontSize: 20, color: COLORS.primary, fontWeight: 'bold', marginTop: 6 },
  strike: { color: COLORS.textLight, textDecorationLine: 'line-through' },
  desc: { marginTop: 12, color: COLORS.textLight, lineHeight: 20 },
  btn: { backgroundColor: COLORS.primary, padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 }
});
