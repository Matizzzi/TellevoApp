import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViajeService } from '../viaje.service';
import { HistorialModalComponent } from '../historial-modal/historial-modal.component';
import { HistorialService } from '../historial.service'; // Importamos el servicio

@Component({
  selector: 'app-buscar-viaje',
  templateUrl: './buscar-viaje.component.html',
  styleUrls: ['./buscar-viaje.component.scss'],
})
export class BuscarViajeComponent implements OnInit {
  searchQuery: string = '';
  viajes: any[] = [];

  constructor(
    private modalController: ModalController,
    private viajeService: ViajeService,
    private historialService: HistorialService // Inyectamos el servicio
  ) {}

  ngOnInit() {
    this.cargarViajes();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  search() {
    this.viajes = this.viajes.filter((viaje) =>
      viaje.lugar.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  cargarViajes() {
    this.viajeService.obtenerViajes().subscribe((viajes: any[]) => {
      this.viajes = viajes;
    });
  }

  async accept(viaje: any) {
    viaje.aceptado = true;

    // Guardamos el viaje en el historial usando el servicio
    this.historialService.agregarAlHistorial(viaje);

    setTimeout(async () => {
      // Remover el viaje de la lista principal
      this.viajes = this.viajes.filter((v) => v !== viaje);

      // Abrir el historial modal con el viaje aceptado
      const modal = await this.modalController.create({
        component: HistorialModalComponent,
        componentProps: {
          viaje: {
            ...viaje,
            estado: 'Viaje por tomar',
          },
        },
      });

      await modal.present();
    }, 2000);
  }

  reject(viaje: any) {
    this.viajes = this.viajes.filter((v) => v !== viaje);
    console.log('Viaje rechazado:', viaje);
  }
}
