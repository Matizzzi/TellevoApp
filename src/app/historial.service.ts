import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  private viajesAceptados: any[] = []; // Almacena los viajes aceptados

  constructor() {
    // Cargar datos guardados en LocalStorage (si existen)
    const storedViajes = localStorage.getItem('viajesAceptados');
    if (storedViajes) {
      this.viajesAceptados = JSON.parse(storedViajes);
    }
  }

  // Obtener el historial de viajes aceptados
  getHistorial(): any[] {
    const viajes = localStorage.getItem('viajesAceptados');
    return viajes ? JSON.parse(viajes) : []; // Si no hay historial, retornamos un arreglo vacío
  }

  // Agregar un nuevo viaje al historial
  agregarViaje(viaje: any) {
    const viajes = this.getHistorial();
    viajes.push(viaje);
    localStorage.setItem('viajesAceptados', JSON.stringify(viajes));
  }

  // Eliminar un viaje del historial
  eliminarViaje(viaje: any) {
    // Filtrar el viaje a eliminar de la lista
    this.viajesAceptados = this.viajesAceptados.filter(v => v.id !== viaje.id);
    
    // Actualizar el almacenamiento local después de la eliminación
    localStorage.setItem('viajesAceptados', JSON.stringify(this.viajesAceptados));
  }

  // Eliminar todos los viajes del historial
  borrarHistorial() {
    this.viajesAceptados = [];
    localStorage.removeItem('viajesAceptados');
  }
}
