import { Injectable } from '@angular/core';
import { Cliente } from '../domain/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = "http://localhost:3000/usuario";

  constructor(private http:HttpClient) { }

  save(cliente: Cliente){
    console.log("Post");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/register`, JSON.stringify(cliente), { headers })
  }

  getAll(){
    return this.http.get<any>(`${this.baseUrl}/get`);
  }

  login(cliente: Cliente) {
    console.log("Post login");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/login`,
      JSON.stringify(cliente),
      { headers }
    );
  }
  
}
