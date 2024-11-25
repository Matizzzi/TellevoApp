import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViajeService } from '../viaje.service';
import { HistorialModalComponent } from '../historial-modal/historial-modal.component';
import { HistorialService } from '../historial.service'; // Importar el servicio

@Component({
  selector: 'app-buscar-viaje',
  templateUrl: './buscar-viaje.component.html',
  styleUrls: ['./buscar-viaje.component.scss'],
})
export class BuscarViajeComponent implements OnInit {
  searchQuery: string = ''; // Almacena el texto de búsqueda
  viajes: any[] = []; // Lista de viajes
  viajeAceptado: boolean = false; // Flag para verificar si hay un viaje aceptado

  constructor(
    private modalController: ModalController,
    private viajeService: ViajeService,
    private historialService: HistorialService // Inyectar el servicio
  ) {}

  ngOnInit() {
    this.cargarViajes();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  cargarViajes() {
    this.viajeService.obtenerViajes().subscribe((viajes: any[]) => {
      this.viajes = viajes;
    });
  }

  // Filtrar viajes según el texto de búsqueda
  buscarViajes() {
    if (!this.searchQuery.trim()) {
      this.cargarViajes(); // Si no hay texto, cargar todos los viajes
      return;
    }
    this.viajes = this.viajes.filter((viaje) =>
      viaje.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Aceptar un viaje (validación de máximo uno)
  async accept(viaje: any) {
    if (this.viajeAceptado) {
      console.log('Solo puedes aceptar un viaje.');
      return; // Solo permite aceptar un viaje
    }

    if (viaje.estado === 'tomado') {
      console.log('Este viaje ya está tomado.');
      return;
    }

    viaje.estado = 'tomado';
    viaje.aceptado = true;

    // Marcar como aceptado el primer viaje
    this.viajeAceptado = true;

    // Guardar el viaje aceptado en el historial
    this.historialService.agregarViaje(viaje);

    // Abrir el modal del historial y pasar el viaje aceptado
    const modal = await this.modalController.create({
      component: HistorialModalComponent,
      componentProps: {
        viaje: viaje, // Pasar el viaje al modal
      },
    });

    await modal.present();

    // Elimina el viaje de la lista actual después de cerrar el modal
    modal.onDidDismiss().then(() => {
      this.viajes = this.viajes.filter((v) => v !== viaje);
    });
  }

  // Rechazar un viaje
  reject(viaje: any) {
    console.log(`Viaje rechazado: ${viaje.nombre} ${viaje.apellido}`);

    // Añadir la clase 'shake' al botón de rechazar
    const rejectButton = document.querySelector(`.btn-reject`);
    if (rejectButton) {
      rejectButton.classList.add('shake');
      // Eliminar la clase después de que termine la animación
      setTimeout(() => {
        rejectButton.classList.remove('shake');
      }, 500); // Duración de la animación
    }

    // Eliminar el viaje de la lista
    this.viajes = this.viajes.filter((v) => v !== viaje);
  }
}
