import { Routes } from '@angular/router';
import { ListarComponent } from './Componentes/listar/listar.component';

export const routes: Routes = [
    {
        path: '',
        component: ListarComponent,
        title: 'Listar Estudiantes',
    }
];