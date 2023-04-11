import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroProyectosPage } from './registro-proyectos.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroProyectosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroProyectosPageRoutingModule {}
