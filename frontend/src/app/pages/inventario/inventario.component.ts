import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Producto } from '../../domain/producto';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent {

  producto: Producto = new Producto();

  constructor(private productoService: ProductoService, private router: Router) {
    let params = this.router.getCurrentNavigation()?.extras.queryParams;
    if(params){
      console.log(params)
      this.producto = new Producto();
      this.producto = params['producto'];
    }
  }

  guardar() {
    const prod: Producto = {
      id: this.producto.id,
      nombre: this.producto.nombre,
      categoria: this.producto.categoria,
      cantidad: this.producto.cantidad,
      precio: this.producto.precio
    };
    console.log('Enviando producto:', prod);
    this.productoService.save(prod).subscribe({
      next: data => {
        console.log("Resultado WS SAVE", data);
        this.router.navigate(['pages/inventario']);
        alert("Producto agregado correctamente");
      },
      error: err => {
        console.error('Error al guardar:', err);
        alert("Error al guardar: " + (err.error?.message || err.message));
      }
    });
    this.producto = new Producto();

  }

}
