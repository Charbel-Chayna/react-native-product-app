import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { getStyles } from './styles';
import { useTheme } from '../../../context/ThemeContext/ThemeContext';

type Props = {
  title: string;
  price: number;
  imageUrl: string;
  onPress: () => void;
};

export const ProductCard: React.FC<Props> = ({ title, price, imageUrl, onPress }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme); 

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
