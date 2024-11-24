import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  private historial: any[] = [];

  constructor() {
    // Cargar el historial desde localStorage al iniciar el servicio
    const historialGuardado = localStorage.getItem('historial');
    this.historial = historialGuardado ? JSON.parse(historialGuardado) : [];
  }

  // Agregar un viaje al historial
  agregarAlHistorial(viaje: any) {
    // Verificar si ya hay un viaje pendiente
    if (this.hayViajePendiente()) {
      throw new Error('Ya tienes un viaje pendiente. Solo puedes tomar uno a la vez.');
    }
    this.historial.push(viaje);
    localStorage.setItem('historial', JSON.stringify(this.historial)); // Guardar en el localStorage
  }

  // Obtener el historial
  obtenerHistorial() {
    return this.historial; // Retornar el historial almacenado
  }

  // Actualizar el historial después de realizar una acción como cancelar un viaje
  actualizarHistorial() {
    localStorage.setItem('historial', JSON.stringify(this.historial)); // Guardar el historial actualizado en localStorage
  }

  // Eliminar un viaje del historial (por ejemplo, cuando se cancela un viaje)
  eliminarViaje(id: string) {
    this.historial = this.historial.filter(viaje => viaje.id !== id); // Eliminar el viaje con el id dado
    this.actualizarHistorial(); // Actualizar el historial después de eliminar el viaje
  }

  // Verificar si ya hay un viaje pendiente
  hayViajePendiente(): boolean {
    // Reemplazar 'cancelado' por el estado que estés usando para indicar que un viaje está pendiente
    return this.historial.some(viaje => !viaje.cancelado);
  }
}
