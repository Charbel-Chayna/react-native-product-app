import React from 'react';
import { View, Text, Image, ScrollView, Share } from 'react-native';
import { useTheme } from '../../../context/ThemeContext/ThemeContext';
import { getStyles } from './styles';
import { Button } from '../../atoms/Button';
import { ButtonVariant } from '../../atoms/Button/Button.type';

type ProductDetailProps = {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
};

export const ProductDetail: React.FC<ProductDetailProps> = ({
  title,
  description,
  price,
  imageUrl,
}) => {
  const { theme } = useTheme(); 
  const styles = getStyles(theme); 

  const onShare = async () => {
    try {
      await Share.share({
        message: `${title}\n\nPrice: $${price}\n\n${description}`,
      });
    } catch (e) {
      console.warn('Share error', e);
    }
  };

  const onAddToCart = () => {
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${price}</Text>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.buttonContainer}>
          <Button onPress={onShare} variant={ButtonVariant.OUTLINE_PRIMARY}>
            Share
          </Button>
          <Button onPress={onAddToCart} variant={ButtonVariant.PRIMARY}>
            Add to Cart
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetail;
