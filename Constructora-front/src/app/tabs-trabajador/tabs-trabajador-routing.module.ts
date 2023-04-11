import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsTrabajadorPage } from './tabs-trabajador.page';

const routes: Routes = [
  {
    path: '',
    component: TabsTrabajadorPage,
    children: [
      {
        path: 'tareas',
        loadChildren: () => import('./tareas/tareas.module').then( m => m.TareasPageModule)
      },
      {
        path: 'cronograma',
        loadChildren: () => import('./cronograma-trab/cronograma-trab.module').then( m=> m.CronogramaTrabPageModule)
      },
      {
        path: 'Cuenta',
        loadChildren: () => import('../tab4/tab4.module').then(m=> m.Tab4PageModule)
      }
    ]
  },
  {
    path: 'cronograma-trab',
    loadChildren: () => import('./cronograma-trab/cronograma-trab.module').then( m => m.CronogramaTrabPageModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsTrabajadorPageRoutingModule {}
