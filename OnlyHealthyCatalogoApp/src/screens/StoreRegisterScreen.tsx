// StoreRegisterScreen.tsx - criado automaticamente
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, Text, TouchableWithoutFeedback, Keyboard, ActivityIndicator, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { validarCNPJ } from '../utils/validators';
import { formatarCNPJ } from '../utils/masks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/navigation';
import { Restaurant } from '../types/restaurant';
import MapView, { Marker } from 'react-native-maps';
import { LinkMenu } from '../components/LinkMenu';
import { storeRegister_styles } from '../styles/storeRegister_styles';
import { global_styles } from '../styles/global';
import { InputMenor } from '../components/InputMenor';
import { MenuButton } from '../components/MenuButton';
import { EditButton } from '../components/EditButton';
import { BuscaCepButton } from '../components/buscaCepButton';
import { salvarRestaurant } from '../services/restaurantService';

type Props = NativeStackScreenProps<AppStackParamList, 'StoreRegister'>;

export const StoreRegisterScreen = ({ route, navigation }: Props) => {
  const lojaEdit = route.params?.restaurant;
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [rua, setRua] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [erro, setErro] = useState('');
  const [nomeErro, setNomeErro] = useState('');
  const [ruaErro, setRuaErro] = useState('');
  const [cepErro, setCepErro] = useState('');
  const [numeroErro, setNumeroErro] = useState('');
  const [bairroErro, setBairroErro] = useState('');
  const [cidadeErro, setCidadeErro] = useState('');
  const [ufErro, setUfErro] = useState('');
  const [cnpjErro, setCnpjErro] = useState('');
  const [latitudeErro, setLatitudeErro] = useState('');
  const [longitudeErro, setLongitudeErro] = useState('');
  const lat = parseFloat(latitude);
  const long = parseFloat(longitude);

  useEffect(() => {
    if (lojaEdit) {
      setNome(lojaEdit.nome);
      setRua(lojaEdit.rua);
      setCep(lojaEdit.cep);
      setNumero((lojaEdit.numero).toString());
      setBairro(lojaEdit.bairro);
      setCidade(lojaEdit.cidade);
      setUf(lojaEdit.uf);
      setCnpj(lojaEdit.cnpj);
      setLatitude(lojaEdit.latitude);
      setLongitude(lojaEdit.longitude);
    }
  }, [lojaEdit]);

  const limparCampos = () => {
      setNome('');
      setRua('');
      setCnpj('');
      setCep('');
      setNumero('');
      setBairro('');
      setCidade('');
      setUf('');
      setLatitude('');
      setLongitude('');
  };

  const limparTextosErro = () => {
      setNomeErro('');
      setRuaErro('');
      setCnpjErro('');
      setCepErro('');
      setNumeroErro('');
      setBairroErro('');
      setCidadeErro('');
      setUfErro('');
      setLatitudeErro('');
      setLongitudeErro('');
  };

  const handleSubmit = async () => {
      limparTextosErro;
      if (!nome.trim()) {
          setNomeErro('Nome do Restaurante deve ser informado!'); 
          return;
      } else if (!rua.trim()) {
          setRuaErro('Rua deve ser informada!');
          return;
      } else if (!cep.trim()){
          setCepErro('Preço deve ser informado!'); 
          return;
      } else if (!numero.trim()){
          setNumeroErro('Número deve ser informado!'); 
          return;
      } else if (!bairro.trim()){
          setBairroErro('Bairro deve ser informado!'); 
          return;
      } else if (!cidade.trim()){
          setCidadeErro('Cidade deve ser informada!'); 
          return;
      } else if (!uf.trim()){
          setUfErro('UF deve ser informado!'); 
          return;      
      } else if (!cnpj.trim()) {
          setCnpjErro('CNPJ deve ser informado!');
          return;
      } else if (!validarCNPJ(cnpj)) {
          setCnpjErro('CNPJ inválido!');
          return;
      } else if (isNaN(lat) || isNaN(long)) {
          Alert.alert('Erro', 'Latitude e Longitude devem ser números válidos!');
          return;
      } 
      setErro('');                              

      const id = lojaEdit?.id ?? Date.now().toString();

      const novoRestaurante: Restaurant = {
          id,
          nome,
          rua,
          cep, 
          numero: Number(numero),
          bairro,
          cidade,
          uf,
          cnpj,
          latitude,
          longitude
      };

    try {
        setLoading(true);
        await salvarRestaurant(novoRestaurante);
        setLoading(false);

        limparCampos();
        Alert.alert('Sucesso', lojaEdit?.id ? 'Restaurante atualizado com sucesso!' : 'Restaurante cadastrado com sucesso!', [
          { text: 'OK',             
            onPress: () => { navigation.navigate('ProductRegister', { });  } 
          },
        ]);                        
    } catch (error) {
        Alert.alert('Erro', 'Erro ao salvar o restaurante.');
        console.error(error);
     }
  };

  // Determina o título principal
  const mainTitleText = lojaEdit?.id ? 'Editar Restaurante' : 'Cadastrar Restaurante';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >    
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={global_styles.container}>          
          <LinkMenu mainTitle={mainTitleText} secondaryTitle="Pratos" onMainPress='StoreRegister' onSecondaryPress='ProductRegister' />
          
          <Text style={global_styles.infoText}>Informe os dados abaixo para cadastro:</Text>
          
          <View style={storeRegister_styles.row}>
            <InputMenor label="CEP" value={cep} onChangeText={setCep} error={cepErro} />
            <BuscaCepButton title="Buscar CEP" onPress={() => navigation.navigate('SearchCep')}  />
          </View>
          <Input label="Nome do Restaurante" value={nome} onChangeText={setNome} error={nomeErro}/>
          <Input label="CNPJ" value={cnpj} onChangeText={(text) => setCnpj(formatarCNPJ(text))} keyboardType="numeric" error={cnpjErro} />
          <Input label="Logradouro" value={rua} onChangeText={setRua} error={ruaErro}/>          

          <View style={storeRegister_styles.row}>
            <InputMenor label="Bairro" value={bairro} onChangeText={setBairro} error={bairroErro} />
            <InputMenor label="Número" value={numero} onChangeText={setNumero} error={numeroErro} />
          </View>
          <View style={storeRegister_styles.row}>
            <InputMenor label="Cidade" value={cidade} onChangeText={setCidade} error={cidadeErro} />
            <InputMenor label="UF" value={uf} onChangeText={setUf} error={ufErro} />
          </View>
          <View style={storeRegister_styles.row}>
            <InputMenor label="Latitude" value={latitude} onChangeText={setLatitude} keyboardType="numeric" error={latitudeErro} />
            <InputMenor label="Longitude" value={longitude} onChangeText={setLongitude} keyboardType="numeric" error={longitudeErro} />
          </View>
          {erro !== '' && <Text style={global_styles.error}>{erro}</Text>}
          <View style={ storeRegister_styles.viewBotao}>                    
            {loading ? (
              <ActivityIndicator size="large" color="#2563EB" style={global_styles.margemActivityIndicator} />
            ) : (
              <Button title={mainTitleText} onPress={handleSubmit} />
            )}   
            <TouchableOpacity onPress={() => navigation.navigate('StoreList')}>
                  <Text style={global_styles.link}>Visualizar Restaurantes</Text>
            </TouchableOpacity>               
          </View>
        </ScrollView>  
    </KeyboardAvoidingView>
  );
};