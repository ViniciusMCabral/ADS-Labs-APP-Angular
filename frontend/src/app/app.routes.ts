import { Routes } from '@angular/router';


import { ClienteListComponent } from './components/clientes/cliente-list/cliente-list';
import { ClienteFormComponent } from './components/clientes/cliente-form/cliente-form';
import { PedidoFormComponent } from './components/pedidos/pedido-form/pedido-form';
import { PedidoListComponent } from './components/pedidos/pedido-list/pedido-list';
import { PratoFormComponent } from './components/pratos/prato-form/prato-form';
import { PratoListComponent } from './components/pratos/prato-list/prato-list';
import { RelatoriosComponent } from './components/relatorios/relatorios';


export const routes: Routes = [
  { 
    path: '', pathMatch: 'full', 
    redirectTo: 'clientes' 
  },
  { 
    path: 'clientes', 
    component: ClienteListComponent 
  },
  { 
    path: 'clientes/novo', 
    component: ClienteFormComponent 
  },
  { 
    path: 'clientes/editar/:id', 
    component: ClienteFormComponent 
  },
  { 
    path: 'pratos', 
    component: PratoListComponent },
  { 
    path: 'pratos/novo', 
    component: PratoFormComponent },
  { 
    path: 'pratos/editar/:id', 
    component: PratoFormComponent 
  },
  { path: 'pedidos', 
    component: PedidoListComponent 
  },
  { path: 'pedidos/novo', 
    component: PedidoFormComponent 
  },
  { path: 'pedidos/editar/:id', 
    component: PedidoFormComponent 
  },
  { path: 'relatorios', 
    component: RelatoriosComponent 
  },
];
