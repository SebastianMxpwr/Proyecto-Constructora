import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProyectoInfoPageRoutingModule } from './proyecto-info-routing.module';

import { NgApexchartsModule } from "ng-apexcharts";
import { ProyectoInfoPage } from './proyecto-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProyectoInfoPageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [ProyectoInfoPage]
})
export class ProyectoInfoPageModule {}
