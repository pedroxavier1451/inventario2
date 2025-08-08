import { Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';

export const routes: Routes = [
    { path: 'pages/inicio', component: InicioComponent },
    { path: 'pages/registro', component: RegistroComponent },
    { path: 'pages/login', component: LoginComponent },
    { path: '', redirectTo: '/pages/inicio', pathMatch: 'full' }
];
