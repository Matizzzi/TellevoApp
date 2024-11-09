import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsModule } from '@angular/google-maps';
import { InterfaceConductorPageRoutingModule } from './interface-conductor-routing.module';
import { InterfaceConductorPage } from './interface-conductor.page'; // Asegúrate de importar el componente principal

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterfaceConductorPageRoutingModule,
    GoogleMapsModule
  ],
  declarations: [InterfaceConductorPage] // Asegúrate de declarar el componente principal aquí
})
export class InterfaceConductorPageModule {}
