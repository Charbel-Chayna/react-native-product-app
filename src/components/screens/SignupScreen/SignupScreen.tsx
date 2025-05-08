import React, { useRef } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Platform,
  ScrollView,
  ImageBackground,
  TextInput,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, SignUpFormData } from '../../../utils/validation/signupSchema';
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

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

export const SignupScreen = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const { login } = useAuth();

const onSubmit = (data: SignUpFormData) => {
  console.log('Signed up user:', data);
  login(); 
};

const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

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
              <ScrollView contentContainerStyle={styles.innerContainer} keyboardShouldPersistTaps="handled">
                <Text style={styles.title}>Create Account</Text>

                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label="Name:"
                      placeholder="Enter your name"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.name?.message}
                      returnKeyType="next"
                      onSubmitEditing={() => emailRef.current?.focus()}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      ref={emailRef}
                      label="Email:"
                      placeholder="Enter your email"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.email?.message}
                      returnKeyType="next"
                      onSubmitEditing={() => phoneRef.current?.focus()}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="phone"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      ref={phoneRef}
                      label="Phone Number:"
                      placeholder="Enter your phone number"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.phone?.message}
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
                    Sign Up
                  </Button>

                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.linkText, { textDecorationLine: 'underline' }]}>
                      Already have an account? Login
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

export default SignupScreen;
