export interface Cliente {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  totalPedidos?: number;
  totalGasto?: number;
}