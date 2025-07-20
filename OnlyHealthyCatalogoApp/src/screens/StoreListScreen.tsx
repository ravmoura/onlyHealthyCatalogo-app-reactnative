// StoreListScreen.tsx - criado automaticamente
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/navigation';
import { Restaurant } from '../types/restaurant';
import { storeList_styles } from '../styles/storeList_styles';

export const StoreListScreen = () => {
  const [restaurants, setRestaurantes] = useState<Restaurant[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  useEffect(() => {
    carregarLojas();
  }, []);

  const carregarLojas = async () => {
    const data = await AsyncStorage.getItem('@OnlyHealthyCatalogoApp:lojas');
    if (data) {
        setRestaurantes(JSON.parse(data));
    }
  };

  const excluirLoja = (id: string) => {
    Alert.alert('Excluir Loja', 'Tem certeza que deseja excluir esta loja?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const atualizadas = restaurants.filter((l) => l.id !== id);
          setRestaurantes(atualizadas);
          await AsyncStorage.setItem('@OnlyHealthyCatalogoApp:lojas', JSON.stringify(atualizadas));
        },
      },
    ]);
  };

  const editarLoja = (restaurant: Restaurant) => {
    console.log("teste");
    navigation.navigate('StoreRegister', { restaurant });
  };

  const renderItem = ({ item }: { item: Restaurant }) => (
    <View style={storeList_styles.card}>
      <View style={storeList_styles.details}>
        <Text style={storeList_styles.nome}>{item.nome}</Text>
        <Text style={storeList_styles.endereco}>{item.rua}</Text>
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
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={storeList_styles.empty}>Nenhuma loja cadastrada.</Text>}
      />
    </View>
  );
};