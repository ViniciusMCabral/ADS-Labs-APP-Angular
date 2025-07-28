import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { Cliente } from '../../../models/cliente';
import { Prato } from '../../../models/prato';
import { Pedido } from '../../../models/pedido'; 
import { PedidoService } from '../../../services/pedido';
import { ClienteService } from '../../../services/cliente';
import { PratoService } from '../../../services/prato';

@Component({
  selector: 'app-pedido-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './pedido-form.html',
  styleUrls: ['./pedido-form.scss']
})
export class PedidoFormComponent implements OnInit {
  pedidoForm: FormGroup;
  clientes: Cliente[] = [];
  allPratos: Prato[] = [];
  
  isEditMode = false;
  private pedidoId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private pratoService: PratoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pedidoForm = this.fb.group({
      clienteId: ['', Validators.required],
      pratos: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(data => this.clientes = data);
    this.pratoService.getPratos().subscribe(data => this.allPratos = data);

    this.pedidoId = this.route.snapshot.paramMap.get('id');
    if (this.pedidoId) {
      this.isEditMode = true;
      this.carregarPedidoParaEdicao(this.pedidoId);
    }
  }

  carregarPedidoParaEdicao(id: string): void {
    this.pedidoService.getPedidoById(id).subscribe({
      next: (pedido: Pedido) => {
        this.pedidoForm.patchValue({
          clienteId: pedido.clienteId
        });

        this.pratos.clear();

        pedido.pratos.forEach(item => {
          this.pratos.push(this.fb.group({
            pratoId: [item.pratoId, Validators.required],
            quantidade: [item.quantidade, [Validators.required, Validators.min(1)]]
          }));
        });
      },
      error: (err) => {
        alert("Erro ao carregar o pedido para edição.");
        this.router.navigate(['/pedidos']);
      }
    });
  }

  get pratos() {
    return this.pedidoForm.get('pratos') as FormArray;
  }

  addPrato() {
    this.pratos.push(this.fb.group({
      pratoId: ['', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]]
    }));
  }

  removePrato(index: number) {
    this.pratos.removeAt(index);
  }

  onSave(): void {
    if (this.pedidoForm.invalid) return;

    const formValue = this.pedidoForm.value;
    
    const operation = this.isEditMode
      ? this.pedidoService.updatePedido(this.pedidoId!, formValue)
      : this.pedidoService.createPedido(formValue);

    operation.subscribe({
      next: () => {
        alert(this.isEditMode ? 'Pedido atualizado com sucesso!' : 'Pedido criado com sucesso!');
        this.router.navigate(['/pedidos']);
      },
      error: (err) => {
        alert(err.error?.message || 'Ocorreu um erro ao salvar o pedido.');
      }
    });
  }
}
