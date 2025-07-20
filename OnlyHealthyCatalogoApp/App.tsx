import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { Routes } from './src/routes';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from './src/context/AuthContext';
import { app_styles } from './src/styles/app_styles';

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View style={app_styles.view}>
        <ActivityIndicator size="large"  color="#ffffff" />
      </View>
    );
  }
  return <Routes />;
}

export default function App() {
  return (
    <AuthProvider >
      <AppContent />
    </AuthProvider>
  );
}
 
