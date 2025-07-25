
// productService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Produto } from '../types/produto';

const STORAGE_KEY = '@OnlyHealthyCatalogoApp:produtos';

export async function salvarProduto(produto: Produto): Promise<void> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  let produtos: Produto[] = []; // Inicializa como array vazio

  if (data) {
    try {
      const parsedData = JSON.parse(data);
      
      if (Array.isArray(parsedData)) {
        produtos = parsedData;
      } else {
        console.warn(`Dados em '${STORAGE_KEY}' não são um array válido. Re-inicializando.`);        
      }
    } catch (parseError) {
      console.error(`Erro ao parsear dados de '${STORAGE_KEY}':`, parseError);
    }
  }

  const index = produtos.findIndex(p => p.id === produto.id);

  if (index !== -1) {
    produtos[index] = produto; // Atualiza
  } else {
    produtos.push(produto); // Novo
  }

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
}

export async function listarProdutos(): Promise<Produto[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  let produtos: Produto[] = []; // Inicializa como array vazio

  if (data) {
    try {
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        produtos = parsedData;
      } else {
        console.warn(`Dados em '${STORAGE_KEY}' para listagem não são um array válido. Retornando array vazio.`);
      }
    } catch (parseError) {
      console.error(`Erro ao parsear dados de '${STORAGE_KEY}' para listagem:`, parseError);
    }
  }
  return produtos;
}

export async function atualizarProduto(produto: Produto): Promise<void> {
  await salvarProduto(produto);
}

export async function excluirProdutoPorId(id: string): Promise<void> {
  const produtos = await listarProdutos();
  const atualizados = produtos.filter(p => p.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizados));
}