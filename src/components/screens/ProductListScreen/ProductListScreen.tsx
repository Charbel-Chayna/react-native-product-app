import React from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductCard } from '../../../components/organisms/ProductCard';
import productsData from '../../../data/Products.json';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../screens/ProductDetailsScreen';
import { Navbar } from '../../../components/organisms/Navbar';
import { useTheme } from '../../../context/ThemeContext/ThemeContext';
import { getStyles } from './styles';


export const ProductListScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const styles = getStyles(isDarkMode);

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />

      <FlatList
        data={productsData.data}
        keyExtractor={item => item._id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <ProductCard
            title={item.title}
            price={item.price}
            imageUrl={item.images[0].url}
            onPress={() => 
              navigation.navigate('ProductDetail', { productId: item._id })
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

export default ProductListScreen;
