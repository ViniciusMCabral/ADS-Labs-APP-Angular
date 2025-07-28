import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Prato } from '../models/prato';

@Injectable({
  providedIn: 'root'
})
export class PratoService {
  private apiUrl = `${environment.apiUrl}/pratos`;

  constructor(private http: HttpClient) { }

  getPratos(): Observable<Prato[]> {
    return this.http.get<Prato[]>(this.apiUrl);
  }
  
  getPratoById(id: string): Observable<Prato> {
    return this.http.get<Prato>(`${this.apiUrl}/${id}`);
  }

  createPrato(prato: Omit<Prato, 'id'>): Observable<Prato> {
    return this.http.post<Prato>(this.apiUrl, prato);
  }

  updatePrato(id: string, prato: Omit<Prato, 'id'>): Observable<Prato> {
    return this.http.put<Prato>(`${this.apiUrl}/${id}`, prato);
  }

  deletePrato(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPratosComMaisPedidos(): Observable<Prato[]> {
    return this.http.get<Prato[]>(`${this.apiUrl}/com-mais-pedidos`);
  }
}