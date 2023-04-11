import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearAreaPage } from './crear-area.page';

const routes: Routes = [
  {
    path: '',
    component: CrearAreaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearAreaPageRoutingModule {}
