// authService.ts - criado automaticamente
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user'; 

const STORAGE_KEY = '@OnlyHealthyCatalogoApp:user';

export async function salvarUsuario(usuario: User): Promise<void> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  const usuarios: User[] = data ? JSON.parse(data) : [];

  const index = usuarios.findIndex(p => p.email === usuario.email);

  if (index !== -1) {
    usuarios[index] = usuario // Atualiza
  } else {
    usuarios.push(usuario); // Novo
  }

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
}

export async function listarUsuarios(): Promise<User[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function atualizarUsuario(usuario: User): Promise<void> {
  await salvarUsuario(usuario); // ✅ pode delegar para salvarProduto agora
}

export async function excluirUsuarioPorEmail(email: string): Promise<void> {
  const usuarios = await listarUsuarios();
  const atualizados = usuarios.filter(p => p.email !== email);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizados));
}