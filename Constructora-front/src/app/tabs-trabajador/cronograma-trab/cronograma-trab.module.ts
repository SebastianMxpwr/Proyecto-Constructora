import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CronogramaTrabPageRoutingModule } from './cronograma-trab-routing.module';

import { CronogramaTrabPage } from './cronograma-trab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CronogramaTrabPageRoutingModule
  ],
  declarations: [CronogramaTrabPage]
})
export class CronogramaTrabPageModule {}
