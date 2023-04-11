import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { TabsTrabajadorPageRoutingModule } from './tabs-trabajador-routing.module';

import { TabsTrabajadorPage } from './tabs-trabajador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsTrabajadorPageRoutingModule
  ],
  declarations: [TabsTrabajadorPage]
})
export class TabsTrabajadorPageModule {}
