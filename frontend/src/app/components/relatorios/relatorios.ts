import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente';
import { PratoService } from '../../services/prato';
import { Cliente } from '../../models/cliente';
import { Prato } from '../../models/prato';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorios.html',
  styleUrls: ['./relatorios.scss']
})
export class RelatoriosComponent implements OnInit {
  topClientesPedidos$!: Observable<Cliente[]>;
  topClientesGastos$!: Observable<Cliente[]>;
  topPratosPedidos$!: Observable<Prato[]>;

  constructor(
    private clienteService: ClienteService,
    private pratoService: PratoService
  ) {}

  ngOnInit(): void {
    this.topClientesPedidos$ = this.clienteService.getClientesComMaisPedidos().pipe(
      catchError(() => of([]))
    );

    this.topClientesGastos$ = this.clienteService.getClientesComMaisGastos().pipe(
      catchError(() => of([]))
    );

    this.topPratosPedidos$ = this.pratoService.getPratosComMaisPedidos().pipe(
      catchError(() => of([]))
    );
  }
}
