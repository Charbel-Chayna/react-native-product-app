import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const scaleFont = (size: number) => {
  const scale = SCREEN_WIDTH / 375; 
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const scaleSize = (size: number) => {
  const scale = SCREEN_WIDTH / 375; 
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  topSafeArea: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)', 
  },
  innerContainer: {
    padding: scaleSize(20),
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
  },
  title: {
    fontSize: scaleFont(35),  
    marginTop: scaleSize(10), 
    fontFamily: 'Poppins-Bold',
    marginBottom: scaleSize(10),  
    textAlign: 'center',
    color: '#fff',
  },
  buttonContainer: {
    marginTop: scaleSize(24), 
    alignItems: 'center',
  },
  linkText: {
    fontSize: scaleFont(17),  
    marginTop: scaleSize(10), 
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
});
