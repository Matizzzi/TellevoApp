import { Component, OnInit } from '@angular/core';
import { ViajeService } from '../viaje.service'; // Importa el servicio
import { ModalController } from '@ionic/angular'; // Importa ModalController

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.scss'],
})
export class ConductorComponent implements OnInit {
  viajes: any[] = []; // Array para almacenar los viajes

  constructor(
    private viajeService: ViajeService,
    private modalController: ModalController // Inyecta ModalController
  ) {}

  ngOnInit() {
    this.cargarViajes();
  }

  // Cargar los viajes desde el servicio
  cargarViajes() {
    this.viajeService.obtenerViajes().subscribe((viajes) => {
      this.viajes = viajes; // Asigna el resultado del Observable al array 'viajes'
    });
  }

  // Función para cerrar el modal
  cerrarModal() {
    this.modalController.dismiss(); // Cierra el modal
  }
}
