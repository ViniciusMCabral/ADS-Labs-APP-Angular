import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../../services/cliente';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './cliente-form.html',
})
export class ClienteFormComponent implements OnInit {
  clienteForm: FormGroup;
  isEditMode = false;
  private clienteId: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.clienteId = this.route.snapshot.paramMap.get('id');

    if (this.clienteId) {
      this.isEditMode = true;
      
      this.clienteService.getClienteById(this.clienteId).subscribe({
        next: (cliente) => {
          console.log("Cliente recebido:", cliente); 
          this.clienteForm.patchValue(cliente);
        },
        error: (err) => {
          console.error("Erro ao buscar cliente:", err); 
          alert(`Não foi possível carregar os dados do cliente. Erro: ${err.status} - ${err.statusText}`);
          this.router.navigate(['/clientes']); 
        }
      });
    }
  }

  onSave(): void {
    if (this.clienteForm.invalid) {
      return;
    }

    const formValue = this.clienteForm.value;
    const operation = this.isEditMode
      ? this.clienteService.updateCliente(this.clienteId!, formValue)
      : this.clienteService.createCliente(formValue);

    operation.subscribe({
      next: () => {
        alert(this.isEditMode ? 'Cliente atualizado com sucesso!' : 'Cliente criado com sucesso!');
        this.router.navigate(['/clientes']);
      },
      error: (err) => {
        console.error("Erro ao salvar cliente:", err);

        if (err.error && typeof err.error.message === 'string' && err.error.message.toLowerCase().includes('cpf')) {
          alert('CPF inválido ou já cadastrado. Por favor, verifique o valor inserido.');
        } 
        else {
          alert('Ocorreu um erro inesperado ao salvar. Tente novamente.');
        }
      }
    });
  }
}