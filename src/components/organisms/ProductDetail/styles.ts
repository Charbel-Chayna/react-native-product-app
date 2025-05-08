import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375;

const scaleSize = (size: number) => {
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

const scaleFont = (size: number) => {
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

const IMAGE_HEIGHT = SCREEN_WIDTH * 0.75;

export const getStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      padding: scaleSize(16),
      backgroundColor: theme === 'dark' ? '#1A1C1E' : '#f5f5f5',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: IMAGE_HEIGHT,
      resizeMode: 'contain',
      backgroundColor: theme === 'dark' ? '#2A2C2F' : '#fff', 
      borderRadius: scaleSize(12),
      marginBottom: scaleSize(16),
    },
    content: {
      width: '100%',
    },
    title: {
      fontSize: scaleFont(24),
      marginBottom: scaleSize(8),
      color: theme === 'dark' ? '#F1F3F4' : '#333',
      fontFamily: 'Poppins-Bold',
    },
    price: {
      fontSize: scaleFont(20),
      color: theme === 'dark' ? '#4DA6FF' : '#007bff',
      marginBottom: scaleSize(12),
      fontFamily: 'Poppins-SemiBold',
    },
    description: {
      fontSize: scaleFont(16),
      lineHeight: scaleSize(24),
      color: theme === 'dark' ? '#CFCFCF' : '#444',
      marginBottom: scaleSize(20),
      textAlign: 'center',
      fontFamily: 'Poppins-Regular',
    },
    buttonContainer: {
      width: '100%',
      marginTop: scaleSize(10),
      flexDirection: 'column',
      rowGap: scaleSize(16),
    },
  });
