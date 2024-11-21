import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private historial: any[] = [];

  constructor() {}

  // Agregar un viaje al historial
  agregarAlHistorial(viaje: any) {
    this.historial.push(viaje);
  }

  // Obtener el historial completo
  obtenerHistorial() {
    return this.historial;
  }
}
