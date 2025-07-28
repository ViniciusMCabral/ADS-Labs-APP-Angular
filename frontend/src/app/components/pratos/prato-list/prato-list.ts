import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Prato } from '../../../models/prato';
import { PratoService } from '../../../services/prato';

@Component({
  selector: 'app-prato-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './prato-list.html',
})
export class PratoListComponent implements OnInit {
  pratos: Prato[] = [];

  constructor(private pratoService: PratoService) { }

  ngOnInit(): void {
    this.loadPratos();
  }

  loadPratos(): void {
    this.pratoService.getPratos().subscribe(data => {
      this.pratos = data;
    });
  }

  deletePrato(id: string): void {
    if (confirm('Tem certeza que deseja remover este prato?')) {
      this.pratoService.deletePrato(id).subscribe(() => {
        alert('Prato removido com sucesso!');
        this.loadPratos();
      }, () => {
        alert('Erro ao remover prato.');
      });
    }
  }
}