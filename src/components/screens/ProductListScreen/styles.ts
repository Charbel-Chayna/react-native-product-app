import { StyleSheet } from 'react-native';

export const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#fff',
    },
    columnWrapper: {
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    listContent: {
      paddingBottom: 20,
      paddingHorizontal: 5,
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#444' : '#ddd',
      marginHorizontal: 10,
      borderRadius: 8,
      marginBottom: 10, 
    },
    paginationButton: {
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderRadius: 6,
      backgroundColor: isDarkMode ? '#444' : '#ccc',
      marginHorizontal: 4,
    },
    paginationText: {
      fontSize: 14,
      color: isDarkMode ? '#eee' : '#000',
    },
    disabledButton: {
      backgroundColor: isDarkMode ? '#222' : '#eee',
    },
    activePage: {
      backgroundColor: '#007bff',
    },
    activePageText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });