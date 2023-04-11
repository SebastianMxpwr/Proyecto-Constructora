import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActividadPageRoutingModule } from './actividad-routing.module';

import { ActividadPage } from './actividad.page';
import { NgApexchartsModule } from "ng-apexcharts";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActividadPageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [ActividadPage]
})
export class ActividadPageModule {}
