import { Injectable } from '@angular/core';
import { Cliente } from '../domain/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }

  save(cliente: Cliente){
    console.log("Post");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>("http://localhost:3000/api/register", JSON.stringify(cliente), { headers })
  }

  getAll(){
    return this.http.get<any>("http://localhost:3000/api/all");
  }

  login(cliente: Cliente) {
    console.log("Post login");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      "http://localhost:3000/api/login",
      JSON.stringify(cliente),
      { headers }
    );
  }
  
}
