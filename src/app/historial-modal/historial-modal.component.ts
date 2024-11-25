import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as QRCode from 'qrcode';
import { HistorialService } from '../historial.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-modal',
  templateUrl: './historial-modal.component.html',
  styleUrls: ['./historial-modal.component.scss'],
})
export class HistorialModalComponent implements OnInit {
  @Input() viaje: any = null; // Recibir el viaje desde el componente padre
  qrCode: string = ''; // URL del código QR generado
  viajesAceptados: any[] = []; // Lista de viajes aceptados desde el servicio

  constructor(
    private modalController: ModalController,
    private historialService: HistorialService, // Inyectar el servicio para acceder al historial
    private router: Router // Inyectar el router para navegación
  ) {}

  ngOnInit() {
    if (this.viaje) {
      this.generarQrCode(); // Generar el QR para el viaje
    }
    this.cargarHistorial(); // Cargar historial de viajes desde el servicio
  }

  // Generar código QR basado en los datos del viaje
  generarQrCode() {
    const data = `Viaje con el conductor: ${this.viaje.nombre} ${this.viaje.apellido} - ${this.viaje.modelo} ${this.viaje.marca} - ${this.viaje.patente}`;
    QRCode.toDataURL(data)
      .then((url) => {
        this.qrCode = url;
      })
      .catch((err) => {
        console.error('Error generando el código QR', err);
      });
  }

  // Cargar el historial de viajes desde el servicio
  cargarHistorial() {
    this.viajesAceptados = this.historialService.getHistorial();
  }

  // Función para cancelar un viaje
  cancelarViaje(viaje: any) {
    // Filtrar el viaje a eliminar del historial
    this.viajesAceptados = this.viajesAceptados.filter((v) => v.id !== viaje.id);

    // Actualizar el localStorage con el nuevo historial
    this.actualizarStorage();

    // Recargar el historial después de la eliminación
    this.cargarHistorial();
  }

  // Función privada para actualizar el localStorage
  private actualizarStorage() {
    localStorage.setItem('viajesAceptados', JSON.stringify(this.viajesAceptados));
  }

  // Cerrar el modal
  dismiss() {
    this.modalController.dismiss();
  }

  // Navegar a la página de chat con los datos del viaje
  irAlChat(viaje: any) {
    this.dismiss(); // Cerrar el modal antes de navegar
    this.router.navigate(['/chat'], {
      queryParams: {
        nombre: viaje.nombre,
        apellido: viaje.apellido,
        modelo: viaje.modelo,
        marca: viaje.marca,
        patente: viaje.patente,
        lugar: viaje.lugar,
        capacidad: viaje.capacidad,
        precio: viaje.precio,
      },
    });
  }
}
