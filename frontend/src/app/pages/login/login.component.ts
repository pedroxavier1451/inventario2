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
      next: (respuesta: any) => {
        console.log("📩 Respuesta cruda del backend:", respuesta);
        alert(respuesta.message);  // usa message, no mensaje

        if (respuesta.user) {
          const rol = respuesta.user.rol;
          console.log("Rol del usuario:", rol);

          // Guardar token solo si es admin
          if (rol === 'admin') {
            localStorage.setItem('token', respuesta.token);
            console.log("✅ Token guardado para admin:", respuesta.token);
          } else {
            console.log("Usuario cliente no almacena token de registro/productos");
          }

          // Redirigir según rol
          if (rol === 'cliente') {
            this.router.navigate(['pages/tienda']);
          } else if (rol === 'admin') {
            this.router.navigate(['pages/inventario']);
          }
        } else {
          console.error('No se recibió usuario desde el backend');
        }
      },
      error: (err) => {
        alert(err.error?.message || 'Error al iniciar sesión');
      }
    });
  }

}
