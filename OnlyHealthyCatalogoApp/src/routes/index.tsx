// index.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { StoreRegisterScreen } from '../screens/StoreRegisterScreen';
import { ProductRegisterScreen } from '../screens/ProductRegisterScreen';
import { ProductListScreen } from '../screens/ProductListScreen';
import { StoreListScreen } from '../screens/StoreListScreen';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { AuthStackParamList, AppStackParamList } from '../types/navigation';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SearchCepScreen from '../screens/SearchCepScreen';


const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

export function Routes() {  
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* isAuthenticated ? ( */}
        <AppStack.Navigator screenOptions={defaultAppStackScreenOptions} >
          <AppStack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
          <AppStack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
          <AppStack.Screen name="Register" component={RegisterScreen} options={{ title: "Cadastro de Usuários" }} />
          <AppStack.Screen name="StoreRegister" component={StoreRegisterScreen}  options={{ title: "Cadastro de Restaurantes" }} />              
          <AppStack.Screen name="SearchCep" component={SearchCepScreen}  options={{ title: "Buscar CEP" }} />              
          <AppStack.Screen name="ProductRegister" component={ProductRegisterScreen} options={{ title: "Cadastro de Pratos" }}/>
          <AppStack.Screen name="ProductList" component={ProductListScreen} options={{ title:"Cardápio" }}/>
          <AppStack.Screen name="StoreList" component={StoreListScreen} options={{ title:"Lista de Restaurantes " }}/>
        </AppStack.Navigator>
      {/* ) : 
        <AuthStack.Navigator id={undefined} >
          <AppStack.Screen name="Home" component={HomeScreen} />
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
      ) */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const defaultAppStackScreenOptions : NativeStackNavigationOptions  = {
  headerStyle: {
    backgroundColor: '#e5e7eb', // Cor de fundo do cabeçalho (cinza claro)
  },
  headerTintColor: '#333333', // Cor do texto e ícones do cabeçalho (cinza escuro)
  headerTitleStyle: {
    fontWeight: 'bold',
  }  
};

