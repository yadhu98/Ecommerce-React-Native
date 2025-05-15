import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from './screens/ProductList';
import ProductDetail from './screens/ProductDetail';
import Cart from './screens/Cart';
import { CartProvider } from './context/CartContext';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'Montserrat-Regular': require('./assets/font/Montserrat-VariableFont_wght.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFont();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#1f7882', 
      card: '#56b8a4',       
      text: '#fff'        
    },
  };

  return (
      <CartProvider>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator>
            <Stack.Screen
              name="ProductList"
              component={ProductList}
              options={({ navigation }) => ({
                title: 'Products',
                headerRight: () => (
                  <TouchableOpacity
                    style={{ marginRight: 16 }}
                    onPress={() => navigation.navigate('Cart')}
                  >
                    <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Regular', color: 'white', fontWeight: '700' }}>Cart</Text>
                  </TouchableOpacity>
                ),
                headerTitleStyle: { fontFamily: 'Montserrat-Regular', fontWeight: '700' },
              })}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={{ 
                title: 'Product Detail',
                headerTitleStyle: { fontFamily: 'Montserrat-Regular', fontWeight: '700' },
              }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{ 
                title: 'Cart',
                headerTitleStyle: { fontFamily: 'Montserrat-Regular', fontWeight: '700' },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
  );
}
