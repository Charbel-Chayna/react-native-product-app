import React from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ProductDetail } from '../../organisms/ProductDetail';
import productsData from '../../../data/Products.json';
import styles from './styles';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: string };
};

type DetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

export const ProductDetailScreen: React.FC = () => {
  const { params } = useRoute<DetailRouteProp>();
  const product = productsData.data.find(p => p._id === params.productId);

  if (!product) {
    Alert.alert('Error', 'Product not found');
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ProductDetail
        title={product.title}
        description={product.description}
        price={product.price}
        imageUrl={product.images[0].url}
      />
    </SafeAreaView>
  );
};

export default ProductDetailScreen;
