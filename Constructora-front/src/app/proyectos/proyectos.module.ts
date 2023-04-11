import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusquedaPipe } from '../Pipes/busqueda.pipe';

import { IonicModule } from '@ionic/angular';

import { ProyectosPageRoutingModule } from './proyectos-routing.module';

import { ProyectosPage } from './proyectos.page';
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";

@NgModule({
    declarations: [ProyectosPage,BusquedaPipe],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProyectosPageRoutingModule,
        ExploreContainerComponentModule
    ]
})
export class ProyectosPageModule {}
