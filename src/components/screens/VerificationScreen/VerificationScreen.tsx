import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../atoms/Button';
import { styles } from './styles';
import { ButtonVariant } from '../../atoms/Button/Button.type';
import { useAuth } from '../../../context/AuthContext/AuthContext'; 

export const VerificationScreen: React.FC = () => {
  const { verify } = useAuth(); 
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleVerify = () => {
    const otpCode = otp.join('');
    console.log('OTP Entered:', otpCode);

    if (otpCode.length === 4) {
      verify(); 
    } else {
      Alert.alert('Enter a 4-digit code');
    }
  };

  useEffect(() => {
    if (otp.every((digit) => digit !== '')) {
      handleVerify();
    }
  }, [otp]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];

    if (text === '') {
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) inputRefs[index - 1].current?.focus();
      return;
    }

    if (!/^\d$/.test(text)) return;

    newOtp[index] = text;
    setOtp(newOtp);

    if (index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace') {
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs[index - 1].current?.focus();
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.title}>Enter Verification Code</Text>
          <Text style={styles.subtitle}>We’ve sent a 4-digit code to your email.</Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                value={otp[index]}
                onChangeText={(text) => handleOtpChange(text, index)}
                autoFocus={index === 0}
                onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
              />
            ))}
          </View>

          <Button onPress={handleVerify} variant={ButtonVariant.PRIMARY}>
            Verify
          </Button>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
