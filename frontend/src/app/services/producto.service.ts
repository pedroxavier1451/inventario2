import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../domain/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }

  save(producto: Producto){
    console.log("Post");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>("http://localhost:3000/api/register", JSON.stringify(producto), { headers })
  }

  getAll(){
    return this.http.get<any>("http://localhost:3000/api/all");
  }

  login(producto: Producto) {
    console.log("Post login");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      "http://localhost:3000/api/login",
      JSON.stringify(producto),
      { headers }
    );
  }
}
