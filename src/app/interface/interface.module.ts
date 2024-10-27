import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InterfacePageRoutingModule } from './interface-routing.module';
import { InterfacePage } from './interface.page';
import { GoogleMapsModule } from '@angular/google-maps'; // Importa GoogleMapsModule aquí

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterfacePageRoutingModule,
    GoogleMapsModule // Asegúrate de agregar este módulo
  ],
  declarations: [InterfacePage]
})
export class InterfacePageModule {}
