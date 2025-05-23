import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './src/navigation/navigation';
import { useAuthStore } from './src/stores/authStore';

const App: React.FC = () => {
  
  return (
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
  );
};

export default App;
