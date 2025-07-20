// LoginScreen.tsx - criado automaticamente
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { LinkMenu } from '../components/LinkMenu';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import { global_styles } from '../styles/global';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: Props) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailerro, setEmailerro] = useState('');
  const [senhaerro, setSenhaerro] = useState('');
  
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const validarEmail = (email: string) => emailRegex.test(email);
  
  const handleLogin = async () => {
      setEmailerro('');
      setSenhaerro('');
      
      if (!email.trim()) {
          setEmailerro('E-mail deve ser informado!'); 
          return;
      } else if (!senha.trim()) {
          setSenhaerro('Senha deve ser informada!');
          return;
      } else if (!validarEmail){
          setEmailerro('E-mail inválido!'); 
          return;
      } 
      setErro('');
      setLoading(true);

      const sucesso = await login(email, senha);
      setLoading(false);

      if (!sucesso) {
        setErro('Usuário ou senha inválidos');
      }
  };

   
  return (
    <View style={global_styles.container}>
      {/*<Image source={require('../assets/logoonlyhealthycinza.png')} style={global_styles.logo} />*/}
      <LinkMenu mainTitle="Login" secondaryTitle="Cadastrar Usuário" onMainPress='Login' onSecondaryPress='Register'/>
      
      <Text style={global_styles.infoText}>Informe e-mail e senha para entrar:</Text>

      <Input label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" error={emailerro}/>
      <Input label="Senha" value={senha} onChangeText={setSenha} secureTextEntry error={senhaerro}/>

      {erro !== '' && <Text style={global_styles.error}>{erro}</Text>}
      <View style={{ height: '3%', backgroundColor: 'transparent' }} />
      {loading ? (
        <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 16 }} />
      ) : (
        <Button title="Entrar" onPress={handleLogin} />
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={global_styles.link}>Não possui conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};