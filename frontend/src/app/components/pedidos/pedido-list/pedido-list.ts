import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Pedido } from '../../../models/pedido';
import { PedidoService } from '../../../services/pedido';

@Component({
  selector: 'app-pedido-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pedido-list.html',
})
export class PedidoListComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.loadPedidos();
  }

  loadPedidos(): void {
    this.pedidoService.getPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
      },
      error: (err) => {
        console.error("Erro ao carregar pedidos:", err);
        this.pedidos = [];
      }
    });
  }

  deletePedido(id: string): void {
    if (confirm('Tem certeza que deseja remover este pedido?')) {
      this.pedidoService.deletePedido(id).subscribe({
        next: () => {
          alert('Pedido removido com sucesso!');
          this.loadPedidos(); 
        },
        error: (err) => {
          alert('Erro ao remover pedido.');
        }
      });
    }
  }
}
