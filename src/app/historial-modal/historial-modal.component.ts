import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HistorialService } from '../historial.service'; // Importamos el servicio
import * as QRCode from 'qrcode';  // Importamos la librería qrcode

@Component({
  selector: 'app-historial-modal',
  templateUrl: './historial-modal.component.html',
  styleUrls: ['./historial-modal.component.scss'],
})
export class HistorialModalComponent implements OnInit {
  historial: any[] = [];  // Declaramos 'historial' como arreglo para almacenar el historial de viajes
  qrCodes: { [id: string]: string } = {}; // Objeto para almacenar el código QR de cada viaje
  mensajeError: string = ''; // Variable para almacenar el mensaje de error

  constructor(
    private modalController: ModalController,
    private historialService: HistorialService  // Inyectamos el servicio
  ) {}

  ngOnInit() {
    // Cargamos el historial desde el servicio
    this.historial = this.historialService.obtenerHistorial();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  // Método para cancelar el viaje
  cancelarViaje(viaje: any) {
    console.log('Cancelando viaje:', viaje);

    // Marcamos el viaje como cancelado
    viaje.cancelado = true;

    // Actualizamos el historial en el servicio para que persista
    this.historialService.actualizarHistorial();

    // Eliminamos el viaje cancelado del historial
    this.historialService.eliminarViaje(viaje.id);

    // Actualizamos el historial en la vista
    this.historial = this.historialService.obtenerHistorial();
  }

  // Método para generar el código QR solo para el viaje seleccionado
  generarCodigoQR(viaje: any) {
    const data = `Viaje con el conductor: ${viaje.nombre} ${viaje.apellido} - ${viaje.modelo} ${viaje.marca} - ${viaje.patente}`; // Personaliza la información que va en el QR

    // Generamos el código QR solo para el viaje seleccionado
    QRCode.toDataURL(data)
      .then(url => {
        // Almacenamos el código QR en el objeto qrCodes usando el id del viaje
        this.qrCodes[viaje.id] = url;
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.error('Error generando el código QR', err.message); // Usamos err.message para acceder al mensaje de error
        } else {
          console.error('Error desconocido generando el código QR', err);
        }
      });
  }

  // Método para agregar un nuevo viaje
  agregarViaje(viaje: any) {
    try {
      // Verificamos si ya hay un viaje pendiente
      const viajePendiente = this.historial.find(item => !item.cancelado);

      if (viajePendiente) {
        // Si hay un viaje pendiente, mostramos un mensaje de error en la pantalla
        this.mensajeError = 'Ya tienes un viaje pendiente. Solo puedes tomar un viaje a la vez.';
      } else {
        // Si no hay viaje pendiente, agregamos el nuevo viaje
        this.historialService.agregarAlHistorial(viaje);
        this.historial = this.historialService.obtenerHistorial(); // Actualizamos el historial
        this.mensajeError = '';  // Limpiamos el mensaje de error si el viaje se agrega correctamente
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message); // Si el error es una instancia de Error, mostramos el mensaje
        this.mensajeError = error.message; // Mostramos el mensaje de error al usuario
      } else {
        console.error('Error desconocido'); // Si el error no es una instancia de Error, mostramos un mensaje genérico
        this.mensajeError = 'Ha ocurrido un error inesperado.'; // Mostramos un mensaje de error general
      }
    }
  }
}
