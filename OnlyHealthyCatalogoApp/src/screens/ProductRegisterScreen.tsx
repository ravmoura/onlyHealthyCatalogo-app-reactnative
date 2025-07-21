// ProductRegisterScreen.tsx
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, Image, ActivityIndicator, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/navigation';
import { Produto } from '../types/produto';
import { salvarProduto } from '../services/productService';
import { product_styles } from '../styles/product_styles';
import { global_styles } from '../styles/global';
import { LinkMenu } from '../components/LinkMenu'; // Certifique-se de que a tipagem deste componente está correta
import { Linking } from 'react-native';
import { InputMenor } from '../components/InputMenor';
import { BuscaCepButton } from '../components/buscaCepButton';
import { storeRegister_styles } from '../styles/storeRegister_styles';

type Props = NativeStackScreenProps<AppStackParamList, 'ProductRegister'>;

export const ProductRegisterScreen = ({ route, navigation }: Props) => {
  const produtoEdicao = route.params?.produto;

  const [nome, setNome] = useState(produtoEdicao?.nome || '');
  const [descricao, setDescricao] = useState(produtoEdicao?.descricao || '');
  const [preco, setPreco] = useState(produtoEdicao?.preco || '');
  const [imagem, setImagem] = useState(produtoEdicao?.imagem || '');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const [nomeerro, setNomeerro] = useState('');
  const [descricaoerro, setDescricaoerro] = useState('');
  const [precoerro, setPrecoerro] = useState('');
  const [imagemerro, setImagemerro] = useState('');
    
  useEffect(() => {
      if (produtoEdicao) {
        navigation.setOptions({ title: 'Editar Prato' });
      }
  }, []);

  const limparCampos = () => {
      setNome('');
      setDescricao('');
      setPreco('');
      setImagem('');
      setNomeerro('');
      setDescricaoerro('');
      setPrecoerro('');
      setImagemerro('');
  };

  const selecionarImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos de acesso à galeria para selecionar imagens.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImagem(result.assets[0].uri);
    }
  };

  const selecionarImagemGaleria = async () => {
    // 1. Verificar o status da permissão
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      // Permissão ainda não concedida, vamos tentar solicitar ou guiar o usuário
      Alert.alert(
        'Permissão Necessária',
        'Precisamos da sua permissão para acessar a galeria de fotos e selecionar uma imagem para o produto. Deseja permitir?',
        [
          {
            text: 'Recusar',
            onPress: () => console.log('Permissão recusada pelo usuário.'),
            style: 'cancel', // Estilo 'cancel' para o botão de negação
          },
          {
            text: 'Permitir',
            onPress: async () => {
              // Tentar solicitar a permissão novamente
              const { status: newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

              if (newStatus === 'granted') {
                // Se a permissão foi concedida agora, abrir a galeria
                try {
                  const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    quality: 1,
                    allowsEditing: true,
                    aspect: [4, 3],
                  });

                  if (!result.canceled && result.assets.length > 0) {
                    setImagem(result.assets[0].uri);
                  } else if (result.canceled) {
                    console.log('Seleção de imagem cancelada após permitir.');
                  }
                } catch (error) {
                  console.error('Erro ao selecionar imagem após permissão:', error);
                  Alert.alert('Erro', 'Não foi possível selecionar a imagem. Tente novamente.');
                }
              } else {
                // Se, mesmo após solicitar novamente, a permissão for negada (usuário recusou 2x ou não tem a opção)
                Alert.alert(
                  'Permissão Negada',
                  'A permissão para acessar a galeria foi negada. Por favor, habilite-a nas configurações do seu dispositivo se deseja selecionar imagens.',
                  [
                    { text: 'OK' },
                    {
                      text: 'Abrir Configurações',
                      onPress: () => Linking.openSettings(), // Abre as configurações do aplicativo
                    },
                  ],
                  { cancelable: false }
                );
              }
            },
          },
        ],
        { cancelable: false } // Impede que o alerta seja fechado clicando fora dele
      );
      return;
    }

    // 2. Se a permissão JÁ foi concedida, abrir a galeria diretamente
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.canceled && result.assets.length > 0) {
        setImagem(result.assets[0].uri);
      } else if (result.canceled) {
        console.log('Seleção de imagem cancelada.');
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem. Tente novamente.');
    }
  };

  const handleSubmit = async () => {
      setNomeerro('');
      setDescricaoerro('');
      setPrecoerro('');
      setImagemerro('');
    
      if (!nome.trim()) {
          setNomeerro('Nome do Prato deve ser informado!'); 
          return;
      } else if (!descricao.trim()) {
          setDescricaoerro('Descrição deve ser informada!');
          return;
      } else if (!preco.trim()){
          setPrecoerro('Preço deve ser informado!'); 
          return;
      } else if (!imagem.trim()){
          setPrecoerro('Imagem deve ser informada!'); 
          return;
      } 
      setErro('');        

      const id = produtoEdicao?.id ?? Date.now().toString();

      const novoProduto: Produto = {
        id,
        nome,
        descricao,
        preco,
        imagem,
      };

      try {
        setLoading(true);
        await salvarProduto(novoProduto);
        setLoading(false);

        Alert.alert(
          'Sucesso',
          produtoEdicao ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!'
        );

        if (produtoEdicao) {
          navigation.goBack();
        } else {
          limparCampos();
          navigation.navigate('ProductList');
        }
      } catch (error) {
        Alert.alert('Erro', 'Erro ao salvar o produto.');
        console.error(error);
      }
    };

    // Determine o título principal uma vez
    const mainTitleText = produtoEdicao ? 'Editar Prato' : 'Cadastrar Prato';

    return (
      <KeyboardAvoidingView
      style={{ flex: 1 }}        
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={global_styles.container}>          
            <LinkMenu mainTitle={mainTitleText} secondaryTitle="Restaurante" onMainPress='ProductRegister' onSecondaryPress='StoreRegister' />        
            <Text style={global_styles.infoText}>Informe os dados abaixo para cadastro:</Text>

            <Input label="Nome do Prato" value={nome} onChangeText={setNome} error={nomeerro} />
            <Input label="Descrição" value={descricao} onChangeText={setDescricao} error={descricaoerro}/>
            <Input label="Preço" value={preco} onChangeText={setPreco} keyboardType="numeric" error={precoerro}/>
            
            <View style={storeRegister_styles.row}>
              <InputMenor label="Imagem" value={imagem} onChangeText={setImagem} error={imagemerro} />
              <BuscaCepButton title="Selecionar IMG" onPress={selecionarImagemGaleria}  />
            </View>                        
            {erro !== '' && <Text style={global_styles.error}>{erro}</Text>}                                            
            <View style={ storeRegister_styles.viewBotao}>                    
                {loading ? (
                  <ActivityIndicator size="large" color="#2563EB" style={global_styles.margemActivityIndicator} />
                ) : (
                  <Button title={produtoEdicao ? 'Salvar Alterações' : 'Cadastrar Prato'} onPress={handleSubmit} />
                )}   
                <TouchableOpacity onPress={() => navigation.navigate('ProductList')} >
                    <Text style={global_styles.link}>Visualize Cardápio</Text>
                </TouchableOpacity>     
            </View>            
            {imagem !== '' &&  <Image source={{ uri: imagem }} style={product_styles.imgPrato} />}                                              
        </ScrollView>
      </KeyboardAvoidingView>
    );
};