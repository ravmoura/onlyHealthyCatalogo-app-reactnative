import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

const STORAGE_KEY = '@OnlyHealthyCatalogoApp:user'; // Para o usuário LOGADO

interface AuthContextData {
  user: User | null;
  login: (email: string, senha: string) => Promise<string>;
  register: (user: Omit<User, 'senha'> & { senha: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const savedUser = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Erro ao carregar usuário do AsyncStorage:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUserFromStorage();
  }, []);

  const login = async (email: string, senha: string): Promise<string> => {
    try {
      // Para o login, você PRECISA BUSCAR A LISTA DE TODOS OS USUÁRIOS!
      // Esta chave deve ser a mesma usada no RegisterScreen para salvar todos os usuários.
      const allUsersJSON = await AsyncStorage.getItem('@OnlyHealthyCatalogoApp:usuarios'); // Usar a chave da lista de usuários
      let allUsers: User[] = [];

      if (allUsersJSON) {
        try {
          const parsedData = JSON.parse(allUsersJSON);
          if (Array.isArray(parsedData)) {
            allUsers = parsedData;
          } else {
            console.warn("Dados de usuários em '@OnlyHealthyCatalogoApp:usuarios' não são um array válido.");
          }
        } catch (parseError) {
          console.error("Erro ao parsear a lista de usuários:", parseError);
        }
      }

      const found = allUsers.find( // Agora 'allUsers' será um array
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
      );

      if (found) {
        setUser(found);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(found)); // Salva o usuário logado na chave de usuário logado
        return found.tipo;
      }
      return ''; // Retorna string vazia se o usuário não for encontrado
    } catch (error) {
      console.error('Erro no login:', error);
      return '';
    }
  };

  const register = async (userData: Omit<User, 'senha'> & { senha: string }): Promise<boolean> => {
    try {
      // Esta função deve interagir com a lista completa de usuários
      const allUsersJSON = await AsyncStorage.getItem('@OnlyHealthyCatalogoApp:usuarios'); // Acessa a lista de todos os usuários
      let allUsers: User[] = [];

      if (allUsersJSON) {
        try {
          const parsedData = JSON.parse(allUsersJSON);
          if (Array.isArray(parsedData)) {
            allUsers = parsedData;
          } else {
            console.warn("Dados de usuários em '@OnlyHealthyCatalogoApp:usuarios' não são um array válido durante o registro.");
          }
        } catch (parseError) {
          console.error("Erro ao parsear a lista de usuários durante o registro:", parseError);
        }
      }

      const exists = allUsers.some((u) => u.email.toLowerCase() === userData.email.toLowerCase());
      if (exists) return false;

      const newUser: User = { id: Date.now().toString(), ...userData };
      allUsers.push(newUser); // Adiciona o novo usuário ao array

      await AsyncStorage.setItem('@OnlyHealthyCatalogoApp:usuarios', JSON.stringify(allUsers)); // Salva o array atualizado de TODOS os usuários

      setUser(newUser); // Define o novo usuário como o usuário logado atual
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser)); // Também salva na chave de usuário logado

      return true;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    AsyncStorage.removeItem(STORAGE_KEY);
    // Opcional: Se você quiser limpar a lista de todos os usuários também, mas geralmente não é necessário no logout
    // AsyncStorage.removeItem('@OnlyHealthyCatalogoApp:usuarios');
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated: !!user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};