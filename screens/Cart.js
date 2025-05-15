import React from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtotal}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 12 , backgroundColor :'#03070c'}}>
      {cart.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 50, fontSize: 18 }}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
          <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            <View style={{ width: '100%', alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={() => {
            addToCart(product);
            navigation.navigate('Cart');
          }}
        >
          <Text style={styles.btnText}>Checkout</Text>
        </TouchableOpacity>
      </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#56b8a4',
    borderRadius: 8,
    elevation: 1,
    padding: 8,
  },
  image: {
    width: 70,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  price: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  qtyBtn: {
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginHorizontal: 4,
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qty: {
    fontSize: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  subtotal: {
    color: '#333',
    fontSize: 13,
  },
  total: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'right',
    marginVertical: 16,
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
