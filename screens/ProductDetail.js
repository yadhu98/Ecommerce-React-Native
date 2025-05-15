import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';

export default function ProductDetail({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useCart();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.rating}>⭐ {product.rating.rate} ({product.rating.count} reviews)</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={() => {
            addToCart(product);
            navigation.navigate('Cart');
          }}
        >
          <Text style={styles.btnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#03070c',
    flexGrow: 1,
  },
  image: {
    width: 180,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 18,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular', 
  },
  price: {
    color: '',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
    fontFamily: 'Montserrat-Regular',
  },
  rating: {
    color: '#ff9900',
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'Montserrat-Regular',
  },
  description: {
    fontSize: 15,
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  btn: {
    backgroundColor: '#efb523',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
