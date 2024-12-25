import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Estudiante } from '../entidades/Estudiante';

@Injectable({
  providedIn: 'root',
})
export class TLista {
  private estudiantes: Estudiante[] = [
    new Estudiante(1, '0703744', 'Bruno', 'Diaz', 'M', '1980-01-12', 8, 9),
    new Estudiante(2, '0703745', 'Ana', 'Loja', 'F', '2000-10-12', 7, 6)
  ];
  private estudiantesSubject = new BehaviorSubject<Estudiante[]>(this.estudiantes);
  estudiantes$ = this.estudiantesSubject.asObservable();

  constructor() {}

  getEstudiantes(): Estudiante[] {
    return this.estudiantesSubject.value;
  }

  addEstudiante(estudiante: Estudiante): void {
    estudiante.determinarEstado(); // Calcular la nota final y el estado aprobatorio
    this.estudiantes.push(estudiante);
    this.estudiantesSubject.next(this.estudiantes);
  }

  updateEstudiante(index: number, estudiante: Estudiante): void {
    if (index >= 0 && index < this.estudiantes.length) {
      estudiante.determinarEstado(); // Calcular la nota final y el estado aprobatorio
      this.estudiantes[index] = estudiante;
      this.estudiantesSubject.next(this.estudiantes);
    } else {
      console.error('Estudiante no encontrado');
    }
  }

  deleteEstudiante(index: number): void {
    if (index >= 0 && index < this.estudiantes.length) {
      this.estudiantes.splice(index, 1);
      this.estudiantesSubject.next(this.estudiantes);
    } else {
      console.error('Estudiante no encontrado');
    }
  }

  getNextCodigo(): number {
    return this.estudiantes.length > 0 ? Math.max(...this.estudiantes.map(e => e.codigo)) + 1 : 1;
  }

  // Métodos para calcular estadísticas
  getPorcentajeAprobados(): number {
    const total = this.estudiantes.length;
    const aprobados = this.estudiantes.filter(e => e.estadoAprobatorio === 'Aprobado').length;
    return total > 0 ? Math.round((aprobados / total) * 100) : 0;
  }

  getPorcentajeReprobados(): number {
    const total = this.estudiantes.length;
    const reprobados = this.estudiantes.filter(e => e.estadoAprobatorio === 'Reprobado').length;
    return total > 0 ? Math.round((reprobados / total) * 100) : 0;
  }

  getPorcentajeAprobadosPorSexo(sexo: string): number {
    const total = this.estudiantes.filter(e => e.sexo === sexo).length;
    const aprobados = this.estudiantes.filter(e => e.sexo === sexo && e.estadoAprobatorio === 'Aprobado').length;
    return total > 0 ? Math.round((aprobados / total) * 100) : 0;
  }

  getPromedioNotaGeneral(): number {
    const total = this.estudiantes.length;
    const sumaNotas = this.estudiantes.reduce((sum, e) => sum + (e.notaDefinitiva || 0), 0);
    return total > 0 ? parseFloat((sumaNotas / total).toFixed(2)) : 0;
  }

  getEstudianteMayorNota(): Estudiante | null {
    if (this.estudiantes.length === 0) return null;
    return this.estudiantes.reduce((max, e) => (e.notaDefinitiva || 0) > (max.notaDefinitiva || 0) ? e : max);
  }
}