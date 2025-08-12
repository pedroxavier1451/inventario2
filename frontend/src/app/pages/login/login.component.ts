import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../domain/cliente';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  cliente: Cliente = new Cliente();

  constructor(private http: HttpClient, private clienteService: ClienteService, private router: Router) {}

  iniciarSesion() {
    this.clienteService.login(this.cliente).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje);
        console.log('Usuario logueado:', respuesta.user);
        this.router.navigate(['pages/inventario']);
      },
      error: (err) => {
        alert(err.error.mensaje || 'Error al iniciar sesión');
      }
    });
  }

}
