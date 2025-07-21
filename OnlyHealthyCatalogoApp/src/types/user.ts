// user.ts - criado automaticamente
export interface User {
  id?: string,
  email: string;
  senha: string;
  nome: string;
  tipo: 'admin' | 'cliente';
}