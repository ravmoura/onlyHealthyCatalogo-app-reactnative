// RegisterScreen.tsx
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
import { User } from '../types/user';
import { validarEmail } from '../utils/validators';

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
  const [tipoerro, setTipoerro] = useState('');

  const limparCampos = () => {
      setNome('');
      setEmail('');
      setSenha('');
      setTipo('cliente');  
  }

  const handleRegister = async () => {
      setNomeerro('');
      setEmailerro('');
      setSenhaerro('');
      setTipoerro('');

      if(!nome.trim()) {
          setNomeerro('Nome Completo deve ser informado!');
          return;
      } else if (!email.trim()) {
          setEmailerro('E-mail deve ser informado!');
          return;
      } else if (!senha.trim()) {
          setSenhaerro('Senha deve ser informada!');
          return;
      } else if (!validarEmail(email)){
          setEmailerro('E-mail inválido!');
          return;
      } else if (!tipo){
          setTipoerro('Tipo deve ser selecionado!');
          return;
      }
      setErro('');
      
      
    try {
        setLoading(true);  
        const usuariosJSON = await AsyncStorage.getItem('@OnlyHealthyCatalogoApp:usuarios');
        let usuarios: User[] = [];

        if (usuariosJSON) {
            try {
                const parsedData = JSON.parse(usuariosJSON);
                if (Array.isArray(parsedData)) { // <--- Verifica se é um array
                    usuarios = parsedData;
                } else {
                    // Se não for um array, loga um aviso e trata como array vazio
                    console.warn("Dados em '@OnlyHealthyCatalogoApp:usuarios' não são um array. Re-inicializando.");
                    // Opcional: Limpar o AsyncStorage para essa chave para remover dados corrompidos
                    await AsyncStorage.removeItem('@OnlyHealthyCatalogoApp:usuarios');
                }
            } catch (parseError) {
                // Se houver um erro de parsing (JSON inválido), loga e trata como array vazio
                console.error("Erro ao parsear dados de '@OnlyHealthyCatalogoApp:usuarios':", parseError);
                // Opcional: Limpar o AsyncStorage para essa chave para remover dados corrompidos
                await AsyncStorage.removeItem('@OnlyHealthyCatalogoApp:usuarios');
            }
        }                
        const emailExistente = usuarios.some((u) => u.email.toLowerCase() === email.toLowerCase());

        if (emailExistente) {
          Alert.alert('Erro', 'Este e-mail já está cadastrado.');
          setLoading(false);
          return;
        }

        const novoUsuario: Omit<User, 'id'> = {
          nome,
          email,
          senha,
          tipo
        };

        usuarios.push(novoUsuario);
        // Garante que SEMPRE um array é salvo de volta para esta chave
        await AsyncStorage.setItem('@OnlyHealthyCatalogoApp:usuarios', JSON.stringify(usuarios));
        setLoading(false);  
        limparCampos();  
        Alert.alert('Sucesso', 'Cadastro '+ tipo +' realizado com sucesso!', [
          { text: 'OK',            
            onPress: () => {
                navigationApp.navigate('Login');
            }
          },
        ]);

    } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível salvar o usuário.');
    } finally {
        setLoading(false);
    }
  };

  return (
      <View style={global_styles.container}>
        <LinkMenu mainTitle="Cadastrar Usuário" secondaryTitle="Login" onMainPress='Register' onSecondaryPress='Login' />

        <Text style={global_styles.infoText}>Informe os dados abaixo para cadastro:</Text>
        <Input label="Nome" value={nome} onChangeText={setNome} error={nomeerro}/>
        <Input label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" error={emailerro}/>
        <Input label="Senha" value={senha} onChangeText={setSenha} secureTextEntry error={senhaerro}/>

        <RadioButtons selectedValue={tipo} onValueChange={setTipo} />
        {tipoerro !== '' && <Text style={global_styles.error}>{tipoerro}</Text>}

        {erro !== '' && <Text style={global_styles.error}>{erro}</Text>}
        <View style={global_styles.espacamento} />
        {loading ? (
          <ActivityIndicator size="large" color="#2563EB" style={global_styles.margemActivityIndicator} />
        ) : (
          <Button title="Cadastrar" onPress={handleRegister} />
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={global_styles.link}>Já possui cadastro? Faça login.</Text>
        </TouchableOpacity>
      </View>
  );
};