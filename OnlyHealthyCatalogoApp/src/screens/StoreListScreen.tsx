// StoreListScreen.tsx - criado automaticamente
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/navigation';
import { Restaurant } from '../types/restaurant';
import { storeList_styles } from '../styles/storeList_styles';
import { excluirRestaurantPorId, listarRestaurants } from '../services/restaurantService';
import { input_styles } from '../styles/input';
import { global_styles } from '../styles/global';

export const StoreListScreen = () => {
  const [filtro, setFiltro] = useState('');
  const [restaurants, setRestaurantes] = useState<Restaurant[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  useEffect(() => {
    carregarRestaurants();
  }, []);

  const carregarRestaurants = async () => {
      const lista = await listarRestaurants();
      setRestaurantes(lista);
  };

  const excluirLoja = (id: string) => {
    Alert.alert('Excluir Produto', 'Tem certeza que deseja excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await excluirRestaurantPorId(id)
          carregarRestaurants();
        },
      },
    ]);
  };
  
  const editarLoja = (restaurant: Restaurant) => {    
    navigation.navigate('StoreRegister', { restaurant });
  };

  const restaurantsFiltrados = restaurants.filter((p) =>
      p.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const renderItem = ({ item }: { item: Restaurant }) => (
    <View style={storeList_styles.card}>
      <View style={storeList_styles.details}>
        <Text style={storeList_styles.nome}>{item.nome}</Text>
        <Text style={storeList_styles.endereco}>{item.rua} - Num: {item.numero} - {item.bairro}</Text>
        <Text style={storeList_styles.endereco}>{item.cidade} - {item.uf}</Text>
        <Text style={storeList_styles.cnpj}>CNPJ: {item.cnpj}</Text>
        <Text style={storeList_styles.coord}>Lat: {item.latitude} | Lon: {item.longitude}</Text>
        <View style={storeList_styles.actions}>
          <TouchableOpacity onPress={() => editarLoja(item)} style={storeList_styles.buttonEdit}>
            <Text style={storeList_styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => excluirLoja(item.id)} style={storeList_styles.buttonDelete}>
            <Text style={storeList_styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={storeList_styles.container}>
      <TextInput
        placeholder="Buscar restaurante..."
        value={filtro}
        onChangeText={setFiltro}
        style={input_styles.input}
      />
      <View style={global_styles.espacamento} />
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={storeList_styles.empty}>Nenhuma loja cadastrada.</Text>}
      />
    </View>
  );
};