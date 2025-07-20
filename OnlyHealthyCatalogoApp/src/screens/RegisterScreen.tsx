// RegisterScreen.tsx - criado automaticamente
// RegisterScreen.tsx - criado automaticamente
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
   ActivityIndicator,
   Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { RadioButtons } from '../components/RadioButton';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import { AppStackParamList } from '../types/navigation';
import { global_styles } from '../styles/global';
import { LinkMenu } from '../components/LinkMenu';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  tipo: 'cliente' | 'admin';
}

export const RegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const navigationApp = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [erro, setErro] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState<'cliente' | 'admin'>('cliente');
  const [loading, setLoading] = useState(false);
  const [nomeerro, setNomeerro] = useState('');
  const [emailerro, setEmailerro] = useState('');
  const [senhaerro, setSenhaerro] = useState('');

  const validarEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = async () => {
      setNomeerro('');
      setEmailerro('');
      setSenhaerro('');
      
      if(!nome.trim()) {
          setNomeerro('Nome Completo deve ser informado!');
          return;
      } else if (!email.trim()) {
          setEmailerro('E-mail deve ser informado!'); 
          return;
      } else if (!senha.trim()) {
          setSenhaerro('Senha deve ser informada!');
          return;
      } else if (!validarEmail){
          setEmailerro('E-mail inválido!'); 
          return;
      }

    try {
        const usuariosJSON = await AsyncStorage.getItem('@OnlyHealthyCatalogoApp:usuarios');
        const usuarios: Usuario[] = usuariosJSON ? JSON.parse(usuariosJSON) : [];

        const emailExistente = usuarios.some((u) => u.email.toLowerCase() === email.toLowerCase());

        if (emailExistente) {
          Alert.alert('Erro', 'Este e-mail já está cadastrado.');
          return;
        }

        const novoUsuario: Usuario = {
          id: Date.now().toString(),
          nome,
          email,
          senha,
          tipo,
        };

        usuarios.push(novoUsuario);
        await AsyncStorage.setItem('@OnlyHealthyCatalogoApp:usuarios', JSON.stringify(usuarios));

        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
          { text: 'OK', 
            //limparCampos(),
            onPress: () => {  navigationApp.navigate('StoreRegister', { });  } 
          },
        ]);                

    } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível salvar o usuário.');
    } finally {
        setLoading(false); // Desativar o loading sempre, mesmo em caso de erro
    }
  };

  return (
      <View style={global_styles.container}>
        {/*<Image source={require('../assets/logoonlyhealthycinza.png')} style={global_styles.logo} />*/}
        <LinkMenu mainTitle="Cadastrar Usuário" secondaryTitle="Login" onMainPress='Register' onSecondaryPress='Login'/>
        
        <Text style={global_styles.infoText}>Informe os dados abaixo para cadastro:</Text>
        <Input label="Nome" value={nome} onChangeText={setNome} error={nomeerro}/>
        <Input label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" error={emailerro}/>
        <Input label="Senha" value={senha} onChangeText={setSenha} secureTextEntry error={senhaerro}/>
        <RadioButtons />
        {erro !== '' && <Text style={global_styles.error}>{erro}</Text>}
        <View style={{ height: '3%', backgroundColor: 'transparent' }} />
        {loading ? (
          <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 16 }} />
        ) : (
          <Button title="Entrar" onPress={handleRegister} />
        )}
        
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={global_styles.link}>Já possui cadastro? Faça login.</Text>
        </TouchableOpacity>
      </View>
  );
};
 