import { Cliente } from "./cliente";
import { Prato } from "./prato";

export interface ItemPrato {
PedidoPrato: any;
  pratoId: string;
  quantidade: number;
  prato?: Prato;
}

export interface Pedido {
  pedido: Cliente[];
  id: string;
  clienteId: string;
  pratos: ItemPrato[];
  cliente?: Cliente; 
}