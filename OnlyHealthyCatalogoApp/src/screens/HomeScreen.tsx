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
  
  const buscarProdutos = async (): Promise<Produto[]> => {
    const data = await AsyncStorage.getItem('@OnlyHealthyCatalogoApp:produtos');
    return data ? JSON.parse(data) : [];
  };

  const gerarDica = async () => {
    setCarregando(true);
    const produtos = await buscarProdutos();
    const texto = await gerarDicaIA(produtos, user?.nome || 'usuário');
    setDica(texto);
    setCarregando(false);
  };

  const limparDica = () => setDica('');

  useEffect(() => {
    gerarDica();
  }, []);  

  type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;
  
  return (
    <View style={home_styles.container}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>                                    
            <Image style={global_styles.logo} source={require('../assets/logoonlyhealthyp.png')} /> 
            <Text style={home_styles.descubraOSaborText}>Descubra o sabor de ser saudável!</Text>
            <Image style={home_styles.advantagesIMG} source={require('../assets/advantages.png')} />        
            <MenuButton title="Login" screen="Login" />
            <MenuButton title="Cadastrar" screen="Register" />
        </View>
        {/*<View style={global_styles.footer}>
            <Text style={global_styles.footerTitle}>🎯 Dicas personalizadas para você</Text>

            <ScrollView style={global_styles.dicaContainer}>
                {carregando ? (
                <ActivityIndicator size="small" style={{ marginVertical: 8 }} />
                ) : dica ? (
                <Text style={global_styles.dica}>{dica}</Text>
                ) : (
                <Text style={global_styles.dicaVazia}>Nenhuma dica no momento.</Text>
                )}
            </ScrollView>
            <View style={global_styles.footerButtons}>
                <TouchableOpacity onPress={gerarDica}>
                <Text style={global_styles.footerLink}>🔄 Nova dica</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={limparDica}>
                <Text style={[global_styles.footerLink]}>🧹 Limpar dica</Text>
                </TouchableOpacity>
            </View>
        </View>
        */}
    </View>    
  );
};