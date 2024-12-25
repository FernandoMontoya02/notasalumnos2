import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListarComponent } from './Componentes/listar/listar.component';
import { AgregarComponent } from './Componentes/agregar/agregar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListarComponent, AgregarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Estudiante';
}
