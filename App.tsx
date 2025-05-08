import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './src/navigation/navigation';
import { AuthProvider } from './src/context/AuthContext/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext/ThemeContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;