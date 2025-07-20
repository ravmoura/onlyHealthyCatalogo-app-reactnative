// navigation.ts - criado automaticamente
import { Loja } from '../types/loja';
import { Produto } from '../types/produto';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  StoreRegister: {loja?: Loja};
  ProductRegister: {produto?: Produto};
  ProductList: undefined;
  StoreList: undefined;
};


 