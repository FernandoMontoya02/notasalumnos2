import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Estudiante } from '../entidades/Estudiante';
import { TLista } from '../controlador/TLista';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar',
  standalone: true,
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
  imports: [FormsModule, CommonModule]
})
export class AgregarComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() selectedEstudiante: Estudiante | null = null;
  @Output() close = new EventEmitter<void>();

  estudiante: Estudiante = new Estudiante(0, '', '', '', '', '', 0, 0);
  nextCodigo: number = 0;

  constructor(private OLista: TLista) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen'] && this.isOpen) {
      this.nextCodigo = this.OLista.getNextCodigo();
      if (!this.selectedEstudiante) {
        this.estudiante.codigo = this.nextCodigo;
      }
    }

    if (changes['selectedEstudiante'] && changes['selectedEstudiante'].currentValue) {
      const selected = changes['selectedEstudiante'].currentValue as Estudiante;
      this.estudiante = new Estudiante(
        selected.codigo,
        selected.cedula,
        selected.nombres,
        selected.apellidos,
        selected.sexo,
        selected.fechaNacimiento,
        selected.parcial1,
        selected.parcial2
      );
      this.estudiante.examenRecuperacion = selected.examenRecuperacion;
      this.estudiante.calificacionFinal = selected.calificacionFinal; // Nueva propiedad
      this.estudiante.notaDefinitiva = selected.notaDefinitiva; // Renombrado
      this.estudiante.estadoAprobatorio = selected.estadoAprobatorio;
    } else {
      this.resetForm();
    }
  }

  saveEstudiante() {
    if (!this.selectedEstudiante) {
      this.estudiante.codigo = this.nextCodigo;
    }
    this.estudiante.determinarEstado();
    if (this.selectedEstudiante) {
      const index = this.OLista.getEstudiantes().findIndex(
        (e) => e.codigo === this.selectedEstudiante!.codigo
      );
      if (index !== -1) {
        this.OLista.updateEstudiante(index, this.estudiante);
      }
    } else {
      this.OLista.addEstudiante(this.estudiante);
    }
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
    this.resetForm();
  }

  resetForm() {
    this.estudiante = new Estudiante(0, '', '', '', '', '', 0, 0);
  }
}