import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import productsData from "../data/products.json"; 

export default function ProductList({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text numberOfLines={1} style={styles.title}>
        {item.title}
      </Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.rating}>⭐ {item.rating.rate}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 8, backgroundColor : '#03070c' }}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#56b8a4",
    borderRadius: 10,
    padding: 8,
    marginVertical: 8,
    width: "48%",
    elevation: 2,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 100,
    resizeMode: "contain",
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
    color : '#1f7882',
    fontSize: 14,
    marginBottom: 4,
    fontFamily : 'Montserrat-Regular'
  },
  price: {
    color: "#03070c",
    fontWeight: "bold",
    marginBottom: 2,
    fontFamily : 'Montserrat-Regular'
  },
  rating: {
    color: "#efb523",
    fontSize: 15,
    fontWeight :700,
    fontFamily : 'Montserrat-Regular'
  },
});
