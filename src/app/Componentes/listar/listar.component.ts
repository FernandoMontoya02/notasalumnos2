import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../entidades/Estudiante';
import { TLista } from '../controlador/TLista';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgregarComponent } from '../agregar/agregar.component';

@Component({
  selector: 'app-listar',
  standalone: true,
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  imports: [CommonModule, FormsModule, AgregarComponent]
})
export class ListarComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  filteredEstudiantes: Estudiante[] = [];
  searchTerm: string = '';
  isOpen: boolean = false;
  selectedEstudiante: Estudiante | null = null;

  constructor(private OLista: TLista) {}

  ngOnInit(): void {
    this.OLista.estudiantes$.subscribe(estudiantes => {
      this.estudiantes = estudiantes;
      this.filterEstudiantes();
    });
  }

  filterEstudiantes(): void {
    this.filteredEstudiantes = this.estudiantes.filter(estudiante =>
      estudiante.nombres.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      estudiante.cedula.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  editEstudiante(estudiante: Estudiante): void {
    this.selectedEstudiante = estudiante;
    this.isOpen = true;
  }

  deleteEstudiante(index: number): void {
    this.OLista.deleteEstudiante(index);
  }

  onCloseModal(): void {
    this.isOpen = false;
    this.selectedEstudiante = null;
  }

  getPorcentajeAprobados(): number {
    return this.OLista.getPorcentajeAprobados();
  }

  getPorcentajeReprobados(): number {
    return this.OLista.getPorcentajeReprobados();
  }

  getPorcentajeAprobadosPorSexo(sexo: string): number {
    return this.OLista.getPorcentajeAprobadosPorSexo(sexo);
  }

  getPromedioNotaGeneral(): number {
    return this.OLista.getPromedioNotaGeneral();
  }

  getEstudianteMayorNota(): Estudiante | null {
    return this.OLista.getEstudianteMayorNota();
  }
}