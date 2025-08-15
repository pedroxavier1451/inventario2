import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Producto } from '../../domain/producto';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatTableModule, CommonModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent {

  producto: Producto = new Producto();
  productos: Producto[] = [];

  constructor(private productoService: ProductoService, private router: Router) {
    let params = this.router.getCurrentNavigation()?.extras.queryParams;
    if(params){
      console.log(params)
      this.producto = new Producto();
      this.producto = params['producto'];
    }
  }

  // Limpiar formulario
  limpiarFormulario() {
    this.producto = new Producto();
  }


  // Cargar todos los productos
  cargarProductos() {
    this.productoService.getAll().subscribe({
      next: data => this.productos = data,
      error: err => console.error("Error al cargar productos:", err)
    });
  }

  guardarProducto() {
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
        this.limpiarFormulario();
        this.cargarProductos();
        alert("Producto agregado correctamente");
      },
      error: err => {
        console.error('Error al guardar:', err);
        alert("Error al guardar: " + (err.error?.message || err.message));
      }
    });
    this.producto = new Producto();
  }

  // Actualizar producto existente
  actualizarProducto() {
    this.productoService.update(this.producto).subscribe({
      next: res => {
        alert("Producto actualizado correctamente");
        this.limpiarFormulario();
        this.cargarProductos();
      },
      error: err => {
        console.error("Error al actualizar producto:", err);
        alert("Error al actualizar producto");
      }
    });
  }

  // Eliminar producto
  eliminarProducto(id: number) {
    if(confirm("¿Seguro que deseas eliminar este producto?")){
      this.productoService.delete(id).subscribe({
        next: res => {
          alert("Producto eliminado correctamente");
          this.cargarProductos();
        },
        error: err => {
          console.error("Error al eliminar producto:", err);
          alert("Error al eliminar producto");
        }
      });
    }
  }

  editarProducto(prod: Producto) {
    // Copiamos los datos del producto seleccionado al formulario
    this.producto = { ...prod }; // Spread operator para evitar mutar el objeto original
  }

}
