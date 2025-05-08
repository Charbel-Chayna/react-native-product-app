import { StyleSheet } from 'react-native';

const LIST_PADDING = 16;
const SPACE_BETWEEN = 12;

export const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#6F7F7F' : '#f5f5f5',
    },
    listContent: {
      paddingHorizontal: LIST_PADDING,
      paddingTop: SPACE_BETWEEN,
      paddingBottom: SPACE_BETWEEN,
    },
    columnWrapper: {
      justifyContent: 'space-between',
      marginBottom: SPACE_BETWEEN,
    },
  });