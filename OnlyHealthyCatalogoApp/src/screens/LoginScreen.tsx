// LoginScreen.tsx - criado automaticamente
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { LinkMenu } from '../components/LinkMenu';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import { global_styles } from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/navigation';
import { validarEmail } from '../utils/validators';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: Props) => {
  const navigationApp = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailerro, setEmailerro] = useState('');
  const [senhaerro, setSenhaerro] = useState('');  

  const limparCampos = () => {
      setEmail('');
      setSenha('');      
  };
  
  const handleLogin = async () => {
      setEmailerro('');
      setSenhaerro('');
      
      if (!email.trim()) {
          setEmailerro('E-mail deve ser informado!'); 
          return;
      } else if (!senha.trim()) {
          setSenhaerro('Senha deve ser informada!');
          return;
      } else if (!validarEmail(email)) {
          setEmailerro('E-mail inválido!');
          return;
      } 
      setErro('');      

      try {
        setLoading(true);      
        const tipoUser = await login(email, senha);
        setLoading(false);

        if (!tipoUser.trim()){
            setErro('E-mail e/ou senha inválidos!');
        } else {
          limparCampos();  
          Alert.alert('Sucesso', 'Login '+ tipoUser + ' realizado com sucesso!', [
            { text: 'OK',             
              onPress: () => { tipoUser === 'admin' ? navigationApp.navigate('StoreRegister', { }): navigationApp.navigate('ProductList');  } 
            },
          ]);
        }
      } catch (error) {
        Alert.alert('Erro', 'Erro ao salvar o produto.');
        console.error(error);
      }      
  };
   
  return (
    <View style={global_styles.container}>
      <LinkMenu mainTitle="Login" secondaryTitle="Cadastrar Usuário" onMainPress='Login' onSecondaryPress='Register'/>
      
      <Text style={global_styles.infoText}>Informe e-mail e senha para entrar:</Text>

      <Input label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" error={emailerro}/>
      <Input label="Senha" value={senha} onChangeText={setSenha} secureTextEntry error={senhaerro}/>

      {erro !== '' && <Text style={global_styles.error}>{erro}</Text>}
      <View style={global_styles.espacamento} />
      {loading ? (
        <ActivityIndicator size="large" color="#2563EB" style={global_styles.margemActivityIndicator} />
      ) : (
        <Button title="Entrar" onPress={handleLogin} />
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={global_styles.link}>Não possui conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};