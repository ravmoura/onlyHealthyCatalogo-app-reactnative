// HomeScreen.tsx - criado automaticamente
import React, { useEffect, useState } from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    RefreshControl,
    StyleSheet,
    Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { gerarDicaIA } from '../services/iaService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Produto } from '../types/produto';
import { Button } from '../components/Button';
import { AuthStackParamList } from '../types/navigation';
import { global_styles } from '../styles/global';
import { home_styles } from '../styles/home_styles'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuButton } from '../components/MenuButton';

export const HomeScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const [dica, setDica] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [loading, setLoading] = useState(false);        
  type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

  const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage limpo com sucesso!');
    Alert.alert('Sucesso', 'Todos os dados foram removidos do aplicativo.');
  } catch (error) {
    console.error('Erro ao limpar o AsyncStorage:', error);
    Alert.alert('Erro', 'Não foi possível limpar os dados do aplicativo.');
  }
};
  
  return (
    <View style={home_styles.container}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>                                    
            <Image style={global_styles.logo} source={require('../assets/logoonlyhealthyp.png')} /> 
            <Text style={home_styles.descubraOSaborText}>Descubra o sabor de ser saudável!</Text>
            <Image style={home_styles.advantagesIMG} source={require('../assets/advantages.png')} />        
            <MenuButton title="Login" screen="Login" />
            <MenuButton title="Cadastrar" screen="Register" />
            <Button title="Limpar dados" onPress={clearAllData} />
        </View>
    </View>    
  );
};