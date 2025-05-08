import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Platform,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '../../../utils/validation/loginSchema';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { ButtonVariant } from '../../atoms/Button/Button.type';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import backgroundImage from '../../../../assets/images/background.png';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../../context/AuthContext/AuthContext';

type RootStackParamList = {
  Login: undefined;
  SignUp: { email: string };
  Verification: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const passwordRef = React.useRef<TextInput>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { login, isLoggedIn } = useAuth();

  const onSubmit = (data: LoginFormData) => {
    const { username, password } = data;
    if (username === 'eurisko' && password === 'academy2025') {
      login();  
    } else {
      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {  
      navigation.navigate('Verification');
    }
  }, [isLoggedIn]);  

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.container}
      imageStyle={{ opacity: 1 }}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.topSafeArea} />

        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <ScrollView
                contentContainerStyle={styles.innerContainer}
                keyboardShouldPersistTaps="handled"
              >
                <Text style={styles.title}>Login</Text>

                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label="Email:"
                      placeholder="Enter your email"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.username?.message}
                      returnKeyType="next"
                      onSubmitEditing={() => passwordRef.current?.focus()}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      ref={passwordRef}                         
                      label="Password:"
                      placeholder="Enter your password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry
                      error={errors.password?.message}
                      returnKeyType="done"
                      onSubmitEditing={handleSubmit(onSubmit)} 
                    />
                  )}
                />

                <View style={styles.buttonContainer}>
                  <Button variant={ButtonVariant.PRIMARY} onPress={handleSubmit(onSubmit)}>
                    Login
                  </Button>

                  <TouchableOpacity onPress={() => navigation.navigate('SignUp', { email: '' })}>
                    <Text style={[styles.linkText, { textDecorationLine: 'underline' }]}>
                      Don't have an account? Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
