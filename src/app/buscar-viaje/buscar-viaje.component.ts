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
  usuario: any; // Asegúrate de que esta propiedad se haya definido como lo vimos antes.

  constructor(
    private modalController: ModalController,
    private viajeService: ViajeService,
    private historialService: HistorialService // Inyectamos el servicio
  ) {}

  ngOnInit() {
    this.obtenerUsuario();
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

  obtenerUsuario() {
    this.usuario = { nombre: 'Juan Perez' }; // O puedes obtener el nombre desde un servicio de autenticación
  }

  cargarViajes() {
    this.viajeService.obtenerViajes().subscribe((viajes: any[]) => {
      this.viajes = viajes;
    });
  }
  

  async accept(viaje: any) {
    if (viaje.estado === 'tomado') {
      console.log('Este viaje ya está tomado.');
      return;
    }
  
    viaje.estado = 'tomado';
    viaje.aceptado = true; // Agrega esta propiedad para mostrar la animación de aceptación
    viaje.usuario = this.usuario;
  
    // Agrega el viaje aceptado al historial
    this.historialService.agregarAlHistorial(viaje);
  
    await this.viajeService.aceptarViaje(viaje.id, this.usuario.nombre);
  
    setTimeout(async () => {
      this.viajes = this.viajes.filter((v) => v !== viaje);
  
      const modal = await this.modalController.create({
        component: HistorialModalComponent,
        componentProps: {
          viaje: viaje,
        },
      });
  
      await modal.present();
    }, 2000);
  }
  
  
  reject(viaje: any) {
    // Elimina el viaje rechazado de la lista
    this.viajes = this.viajes.filter((v) => v !== viaje);
  
    console.log('Viaje rechazado:', viaje);
  }
  
}
