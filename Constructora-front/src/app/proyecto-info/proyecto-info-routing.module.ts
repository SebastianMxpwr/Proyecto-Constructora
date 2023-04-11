import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProyectoInfoPage } from './proyecto-info.page';

const routes: Routes = [
  {
    path: '',
    component: ProyectoInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProyectoInfoPageRoutingModule {}
