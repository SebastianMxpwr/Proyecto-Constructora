import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroProyectosPageRoutingModule } from './registro-proyectos-routing.module';

import { RegistroProyectosPage } from './registro-proyectos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistroProyectosPageRoutingModule
  ],
  declarations: [RegistroProyectosPage]
})
export class RegistroProyectosPageModule {}
