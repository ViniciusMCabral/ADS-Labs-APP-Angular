import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../../../services/cliente';
import { Cliente } from '../../../models/cliente';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './cliente-list.html',
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;
    });
  }

  deleteCliente(id: string): void {
    if (confirm('Tem certeza que deseja remover este cliente?')) {
      this.clienteService.deleteCliente(id).subscribe({
        next: () => {
          alert('Cliente removido com sucesso!');
          this.loadClientes();
        },
        error: (err) => {
          console.error("Erro ao remover cliente:", err);
          alert('Erro ao remover cliente.');
        }
      });
    }
  }
}