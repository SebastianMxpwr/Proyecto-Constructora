import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CronogramaTrabPage } from './cronograma-trab.page';

const routes: Routes = [
  {
    path: '',
    component: CronogramaTrabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CronogramaTrabPageRoutingModule {}
