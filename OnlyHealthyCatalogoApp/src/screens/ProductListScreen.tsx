// ProductListScreen.tsx - criado automaticamente
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/navigation';
import { Produto } from '../types/produto';
import { listarProdutos, excluirProdutoPorId } from '../services/productService';
import { product_styles } from '../styles/product_styles';
import { Button } from '../components/Button';
import { EditButton } from '../components/EditButton';
import { input_styles } from '../styles/input';
import { global_styles } from '../styles/global';

export const ProductListScreen = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtro, setFiltro] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      carregarProdutos();
    }
  }, [isFocused]);

  const carregarProdutos = async () => {
    const lista = await listarProdutos();
    setProdutos(lista);
  };

  const excluirProduto = (id: string) => {
    Alert.alert('Excluir Produto', 'Tem certeza que deseja excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await excluirProdutoPorId(id);
          carregarProdutos();
        },
      },
    ]);
  };

  const editarProduto = (produto: Produto) => {
    navigation.navigate('ProductRegister', { produto });
  };

  const renderItem = ({ item }: { item: Produto }) => (
    <View style={product_styles.card}>
      <Image
        source={
          item.imagem
            ? { uri: item.imagem }
            : require('../assets/placeholder.png') // Imagem fallback local
        }
        style={product_styles.image}
      />
      <View style={product_styles.details}>
        <Text style={product_styles.nome}>{item.nome}</Text>
        <Text style={product_styles.descricao}>{item.descricao}</Text>
        <Text style={product_styles.preco}>R$ {item.preco}</Text>
        
        <View style={product_styles.actions}>          
            <EditButton title='Editar' onPress={() => editarProduto(item)} variant='primary'/>
            <EditButton title='Excluir' onPress={() => excluirProduto(item.id)} variant='secondary'/>            
        </View>
      </View>
    </View>
  );

  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <View style={product_styles.containerList}>
      <TextInput
        placeholder="Buscar produto..."
        value={filtro}
        onChangeText={setFiltro}
        style={input_styles.input}
      />
      <View style={global_styles.espacamento} />
      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={product_styles.empty}>Nenhum produto cadastrado.</Text>}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};


 