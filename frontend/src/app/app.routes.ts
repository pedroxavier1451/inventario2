import { Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { InventarioComponent } from './pages/inventario/inventario.component';

export const routes: Routes = [
    { path: 'pages/inicio', component: InicioComponent },
    { path: 'pages/registro', component: RegistroComponent },
    { path: 'pages/login', component: LoginComponent },
    { path: 'pages/inventario', component: InventarioComponent },
    { path: '', redirectTo: '/pages/inicio', pathMatch: 'full' }
];
