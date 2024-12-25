import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './listar.component';
import { FormsModule } from '@angular/forms';
import { AgregarComponent } from '../agregar/agregar.component';


@NgModule({
  declarations: [ListarComponent],
  imports: [CommonModule, FormsModule, AgregarComponent],
  exports: [ListarComponent]
})
export class ListarModule {}