import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext/AuthContext';
import { LoginScreen } from '../components/screens/LoginScreen';
import { SignupScreen } from '../components/screens/SignupScreen';
import { VerificationScreen } from '../components/screens/VerificationScreen';
import { ProductListScreen } from '../components/screens/ProductListScreen';
import { ProductDetailScreen } from '../components/screens/ProductDetailsScreen';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  const { isLoggedIn, isVerified } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn && (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignupScreen} />
        </>
      )}

      {isLoggedIn && !isVerified && (
        <Stack.Screen name="Verification" component={VerificationScreen} />
      )}

      {isLoggedIn && isVerified && (
        <>
          <Stack.Screen name="ProductList" component={ProductListScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: true }} />
        </>
      )}
    </Stack.Navigator>
  );
};
