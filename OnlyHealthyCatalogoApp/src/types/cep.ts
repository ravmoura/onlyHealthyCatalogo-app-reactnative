export interface CepData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export async function fetchCepData(cep: string): Promise<CepData> {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  if (!response.ok) throw new Error('Erro ao buscar CEP');
  return await response.json();
}
