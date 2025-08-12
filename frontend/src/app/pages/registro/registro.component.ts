import { Component } from '@angular/core';
import { Cliente } from '../../domain/cliente';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-registro',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  cliente: Cliente = new Cliente();

  constructor(private clientesService: ClienteService,
    private router: Router
    ) {
      let params = this.router.getCurrentNavigation()?.extras.queryParams;
      if(params){
        console.log(params)
        this.cliente = new Cliente()
        this.cliente = params['cliente']
      }
    }

  guardar() {
    const usuario = {
      username: this.cliente.username,
      email: this.cliente.email,
      password: this.cliente.password
    };
    console.log('Enviando usuario:', usuario);
    this.clientesService.save(usuario).subscribe({
      next: data => {
        console.log("Resultado WS SAVE", data);
        this.router.navigate(['pages/login']);
        alert("Se agrego correctamente");
      },
      error: err => {
        console.error('Error al guardar:', err);
        alert("Error al guardar: " + (err.error?.message || err.message));
      }
    });
    this.cliente = new Cliente();
  }
}
