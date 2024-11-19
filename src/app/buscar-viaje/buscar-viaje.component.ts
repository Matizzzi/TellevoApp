import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-buscar-viaje',
  templateUrl: './buscar-viaje.component.html',
  styleUrls: ['./buscar-viaje.component.scss'],
})
export class BuscarViajeComponent {
  searchQuery: string = '';

  constructor(private modalController: ModalController) {}

  // Cerrar el modal
  dismiss() {
    this.modalController.dismiss();
  }

  // Realizar búsqueda
  search() {
    console.log('Buscando viaje con destino:', this.searchQuery);
    // Aquí puedes agregar la lógica de búsqueda
    this.dismiss(); // Cierra el modal al hacer la búsqueda
  }
}
