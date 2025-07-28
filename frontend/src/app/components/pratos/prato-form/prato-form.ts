import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PratoService } from '../../../services/prato';
import { Prato } from '../../../models/prato';

@Component({
  selector: 'app-prato-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './prato-form.html',
})
export class PratoFormComponent implements OnInit {
  pratoForm: FormGroup;
  isEditMode = false;
  private pratoId: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private pratoService: PratoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pratoForm = this.fb.group({
      nome: ['', Validators.required],
      preco: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.pratoId = this.route.snapshot.paramMap.get('id');
    if (this.pratoId) {
      this.isEditMode = true;
      this.pratoService.getPratoById(this.pratoId).subscribe({
        next: (prato) => {
          this.pratoForm.patchValue(prato);
        },
        error: (err) => {
          console.error("Erro ao buscar prato para edição:", err);
          alert("Não foi possível carregar os dados do prato.");
          this.router.navigate(['/pratos']);
        }
      });
    }
  }

  onSave(): void {
    if (this.pratoForm.invalid) return;

    const formValue = this.pratoForm.value;
    const operation = this.isEditMode
      ? this.pratoService.updatePrato(this.pratoId!, formValue)
      : this.pratoService.createPrato(formValue);

    operation.subscribe({
      next: () => {
        alert(this.isEditMode ? 'Prato atualizado com sucesso!' : 'Prato criado com sucesso!');
        this.router.navigate(['/pratos']);
      },
      error: (err) => {
        console.error("Erro ao salvar prato:", err);

        if (err.error && err.error.message) {
          alert(err.error.message);
        } else {
          alert('Ocorreu um erro inesperado. Tente novamente.');
        }
      }
    });
  }
}
