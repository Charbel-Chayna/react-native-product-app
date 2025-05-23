import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  TextInput,
  View,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter } from 'lucide-react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import API from '../../../services/axios';
import { useAuthStore } from '../../../stores/authStore';
import { useThemeStore } from '../../../stores/themeStore';
import { RootStackParamList } from '../ProductDetailsScreen';
import { Navbar } from '../../../components/organisms/Navbar';
import { TabBar } from '../../../components/organisms/tabbar';
import { ProductCard } from '../../../components/organisms/ProductCard';
import { getStyles } from './styles';

export const ProductListScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useThemeStore();
  const styles = getStyles(theme === 'dark');

  const accessToken = useAuthStore(s => s.accessToken);
  const isLoggedIn = useAuthStore(s => s.isLoggedIn);

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  const hasFetchedOnce = useRef(false);

 useEffect(() => {
  if (products.length > 0) {
    console.log(`Fetched ${products.length} products on page ${page} of ${totalPages}`);
  }
}, [products]);


  const fetchProducts = useCallback(
    async (pageToFetch = 1, isRefresh = false) => {
      if (!accessToken) return;
      if (!isRefresh) setLoading(true);
      setError(null);

      const params: any = { page: pageToFetch, limit: 10 };
      if (sortOrder) {
        params.sortBy = 'price';
        params.order = sortOrder;
      }

      try {
        let res;

        if (searchTerm) {
          res = await API.get('/api/products/search', {
            params: { query: searchTerm },
            headers: { Authorization: `Bearer ${accessToken}` },
          });
        } else {
          res = await API.get('/api/products', {
            params,
            headers: { Authorization: `Bearer ${accessToken}` },
          });
        }

        const fetched = res.data.data;
        const pagination = res.data.pagination;

        const calcTotalPages = pagination?.totalPages ?? 1;
        const currentPage = pagination?.currentPage ?? pageToFetch;

        setProducts(fetched);
        setTotalPages(calcTotalPages);
        setPage(currentPage);
      } catch (e: any) {
        setError(
          e.response?.status === 521
            ? 'Server unavailable, pull to retry'
            : e.message || 'Failed to fetch products'
        );
      } finally {
        setLoading(false);
        if (isRefresh) setRefreshing(false);
      }
    },
    [accessToken, searchTerm, sortOrder]
  );

  useFocusEffect(
    useCallback(() => {
      if (isLoggedIn && !hasFetchedOnce.current) {
        fetchProducts(1);
        hasFetchedOnce.current = true;
      }
    }, [isLoggedIn, fetchProducts])
  );

 const refreshAccessToken = useAuthStore(s => s.refreshAccessToken);

const onRefresh = async () => {
  setRefreshing(true);
  hasFetchedOnce.current = false;

  const refreshed = await refreshAccessToken();
  if (refreshed) {
    fetchProducts(1, true);
  } else {
    setRefreshing(false); 
  }
};


  useEffect(() => {
    if (hasFetchedOnce.current) {
      fetchProducts(1);
    }
  }, [sortOrder]);

  const toggleSortOrder = () => {
  const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
  setSortOrder(newOrder);
};


  const getPageNumbers = () => {
  const pageNumbers = [];
  let start = Math.max(1, page - 1);
  let end = Math.min(totalPages, page + 1);

  if (page <= 2) {
    start = 1;
    end = Math.min(3, totalPages);
  } else if (page >= totalPages - 1) {
    start = Math.max(totalPages - 2, 1);
    end = totalPages;
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />

      <View style={{ flex: 1 }}>
        {/* Search + Filter Row */}
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <TextInput
              placeholder="Search…"
              value={searchTerm}
              onChangeText={setSearchTerm}
              onSubmitEditing={() => fetchProducts(1)}
              returnKeyType="search"
              clearButtonMode="while-editing"
              style={{
                backgroundColor: theme === 'dark' ? '#333' : '#eee',
                borderRadius: 8,
                paddingHorizontal: 10,
                height: 40,
                color: theme === 'dark' ? 'white' : 'black',
              }}
            />
          </View>

          <TouchableOpacity
            onPress={toggleSortOrder}
            style={{
              padding: 8,
              backgroundColor: theme === 'dark' ? '#555' : '#ddd',
              borderRadius: 8,
            }}
          >
            <Filter color={theme === 'dark' ? 'white' : 'black'} size={22} />
          </TouchableOpacity>
        </View>

        {loading && page === 1 ? (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={products}
            keyExtractor={x => x._id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => {
              const fullImageUrl = item.images[0]?.url
                ? API.defaults.baseURL + item.images[0].url
                : undefined;

              return (
                <ProductCard
                  title={item.title}
                  price={item.price}
                  imageUrl={fullImageUrl}
                  onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
                />
              );
            }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            ListFooterComponent={
              <>
                {loading && page > 1 && <ActivityIndicator size="small" style={{ margin: 10 }} />}

                {/* Pagination */}
                <View style={styles.paginationContainer}>
                  <TouchableOpacity
                    disabled={page <= 1}
                    onPress={() => fetchProducts(page - 1)}
                    style={[styles.paginationButton, page <= 1 && styles.disabledButton]}
                  >
                    <Text style={styles.paginationText}>Prev</Text>
                  </TouchableOpacity>

                  {getPageNumbers().map(pn => (
                    <TouchableOpacity
                      key={pn}
                      onPress={() => fetchProducts(pn)}
                      style={[styles.paginationButton, pn === page && styles.activePage]}
                    >
                      <Text
                        style={[styles.paginationText, pn === page && styles.activePageText]}
                      >
                        {pn}
                      </Text>
                    </TouchableOpacity>
                  ))}

                  <TouchableOpacity
                    disabled={page >= totalPages}
                    onPress={() => fetchProducts(page + 1)}
                    style={[styles.paginationButton, page >= totalPages && styles.disabledButton]}
                  >
                    <Text style={styles.paginationText}>Next</Text>
                  </TouchableOpacity>
                </View>
              </>
            }
          />
        )}
      </View>

      <TabBar />
    </SafeAreaView>
  );
};

export default ProductListScreen;
