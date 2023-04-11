import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearAreaPageRoutingModule } from './crear-area-routing.module';

import { CrearAreaPage } from './crear-area.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearAreaPageRoutingModule
  ],
  declarations: [CrearAreaPage]
})
export class CrearAreaPageModule {}
