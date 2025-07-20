// StoreRegisterScreen.tsx - criado automaticamente
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { validarCNPJ } from '../utils/validators';
import { formatarCNPJ } from '../utils/masks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/navigation';
import { Loja } from '../types/loja';
import MapView, { Marker } from 'react-native-maps';
import { LinkMenu } from '../components/LinkMenu';
import { storeRegister_styles } from '../styles/storeRegister_styles';
import { global_styles } from '../styles/global';
import { InputMenor } from '../components/InputMenor';

type Props = NativeStackScreenProps<AppStackParamList, 'StoreRegister'>;

export const StoreRegisterScreen = ({ route, navigation }: Props) => {
  const lojaEdit = route.params?.loja;

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
      } 
      //setErro('');            

      const lat = parseFloat(latitude);
      const long = parseFloat(longitude);
      if (isNaN(lat) || isNaN(long)) {
        Alert.alert('Erro', 'Latitude e Longitude devem ser números válidos!');
        return;
      }

    try {
      const dadosExistentes = await AsyncStorage.getItem('@OnlyHealthyCatalogoApp:lojas');
      const lojas = dadosExistentes ? JSON.parse(dadosExistentes) : [];

      if (lojaEdit) {
        const lojasAtualizadas = lojas.map((l: Loja) =>
          l.id === lojaEdit.id
            ? { ...l, nome, rua, cep, numero, bairro, cidade, uf, cnpj, latitude, longitude }
            : l
        );
        await AsyncStorage.setItem('@OnlyHealthyCatalogoApp:lojas', JSON.stringify(lojasAtualizadas));
        Alert.alert('Sucesso', 'Loja atualizada com sucesso!');
      } else {
        const novaLoja: Loja = {
          id: Date.now().toString(),
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
        lojas.push(novaLoja);
        await AsyncStorage.setItem('@OnlyHealthyCatalogoApp:lojas', JSON.stringify(lojas));
        Alert.alert('Sucesso', 'Loja cadastrada com sucesso!');
        limparCampos();
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar a loja.');
      console.error(error);
    }
  };
  // Determina o título principal
  const mainTitleText = lojaEdit ? 'Editar Restaurante' : 'Cadastrar Restaurante';

  return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  >
    {/*<TouchableWithoutFeedback onPress={Keyboard.dismiss}>       */}
      {/*<View style={global_styles.container}>*/}        
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={global_styles.container}>          
          <LinkMenu mainTitle={mainTitleText} secondaryTitle="Pratos" onMainPress='StoreRegister' onSecondaryPress='ProductRegister' />
          <Input label="Nome do Restaurante" value={nome} onChangeText={setNome} error={nomeErro}/>
          <Input label="CNPJ" value={cnpj} onChangeText={(text) => setCnpj(formatarCNPJ(text))} keyboardType="numeric" error={cnpjErro} />
          <Input label="Rua" value={rua} onChangeText={setRua} error={ruaErro}/>
          <View style={storeRegister_styles.row}>
            <InputMenor label="CEP" value={cep} onChangeText={setCep} error={cepErro} />
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
          <View style={ storeRegister_styles.viewBotao}>
            <Button title={lojaEdit ? 'Salvar Alterações' : 'Cadastrar Loja'} onPress={handleSubmit} />
          </View>
        </ScrollView>
  {/*    </View>     */}
  {/*  </TouchableWithoutFeedback> */}
   </KeyboardAvoidingView>
);
};