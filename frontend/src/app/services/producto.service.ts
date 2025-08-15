import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../domain/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl = "http://localhost:3000/producto";

  constructor(private http:HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || ''; // Tomamos el token guardado

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token || ''}` // Agregamos el token al header
    });

    return headers;
  }

  // Crear producto
  save(producto: Producto) {
    return this.http.post<any>(
      `${this.baseUrl}/register`,
      JSON.stringify(producto),
      { headers: this.getAuthHeaders() }
    );
  }

  // Obtener todos los productos
  getAll(){
    return this.http.get<any>(`${this.baseUrl}/get`, { headers: this.getAuthHeaders() });
  }

  // Actualizar producto
  update(producto: Producto){
    return this.http.put<any>(
      `${this.baseUrl}/update/${producto.id}`, 
      producto,
      { headers: this.getAuthHeaders() }
    );
  }

  // Eliminar producto por id
  delete(id: number){
    return this.http.delete<any>(
      `${this.baseUrl}/delete/${id}`, 
      { headers: this.getAuthHeaders() }
    );
  }
}