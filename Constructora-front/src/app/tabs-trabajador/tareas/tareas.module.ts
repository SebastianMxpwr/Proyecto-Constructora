import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Busqueda2Pipe } from "../../Pipes/busqueda2.pipe";

import { IonicModule } from '@ionic/angular';

import { TareasPageRoutingModule } from './tareas-routing.module';

import { TareasPage } from './tareas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareasPageRoutingModule
  ],
  declarations: [TareasPage,Busqueda2Pipe]
})
export class TareasPageModule {}
