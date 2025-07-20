// navigation.ts - criado automaticamente
import { Restaurant } from './restaurant';
import { Produto } from '../types/produto';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  StoreRegister: {restaurant?: Restaurant};
  ProductRegister: {produto?: Produto};
  ProductList: undefined;
  StoreList: undefined;
  SearchCep: undefined;
};


 