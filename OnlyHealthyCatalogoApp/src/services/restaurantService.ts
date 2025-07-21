import AsyncStorage from '@react-native-async-storage/async-storage';
import { Restaurant } from '../types/restaurant';

const STORAGE_KEY = '@OnlyHealthyCatalogoApp:restaurants';

export async function salvarRestaurant(restaurant: Restaurant): Promise<void> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  let restaurants: Restaurant[] = []; // Inicializa como array vazio

  if (data) {
    try {
      const parsedData = JSON.parse(data);
      
      if (Array.isArray(parsedData)) {
        restaurants = parsedData;
      } else {
        console.warn(`Dados em '${STORAGE_KEY}' não são um array válido. Re-inicializando.`);        
      }
    } catch (parseError) {
      console.error(`Erro ao parsear dados de '${STORAGE_KEY}':`, parseError);
    }
  }

  const index = restaurants.findIndex(p => p.id === restaurant.id);

  if (index !== -1) {
    restaurants[index] = restaurant; // Atualiza
  } else {
    restaurants.push(restaurant); // Novo
  }

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
}

export async function listarRestaurants(): Promise<Restaurant[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  let restaurants: Restaurant[] = []; // Inicializa como array vazio

  if (data) {
    try {
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        restaurants = parsedData;
      } else {
        console.warn(`Dados em '${STORAGE_KEY}' para listagem não são um array válido. Retornando array vazio.`);
      }
    } catch (parseError) {
      console.error(`Erro ao parsear dados de '${STORAGE_KEY}' para listagem:`, parseError);
    }
  }
  return restaurants;
}

export async function atualizarRestaurant(restaurant: Restaurant): Promise<void> {
  await salvarRestaurant(restaurant);
}

export async function excluirRestaurantPorId(id: string): Promise<void> {
  const restaurants = await listarRestaurants();
  const atualizados = restaurants.filter(p => p.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizados));
}
