import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViajeService {
  // Crear un BehaviorSubject que guardará los viajes aceptados
  private viajesAceptados = new BehaviorSubject<any[]>([]);

  // Exponer el observable para que otros componentes puedan suscribirse
  viajesAceptados$ = this.viajesAceptados.asObservable();

  constructor() {}

  // Método para agregar un viaje aceptado a la lista
  agregarViajeAceptado(viaje: any) {
    // Obtener los viajes actuales y agregar el nuevo viaje
    const viajesActuales = this.viajesAceptados.getValue();
    this.viajesAceptados.next([...viajesActuales, viaje]); // Emitir el nuevo valor
  }

  // Método para obtener los viajes aceptados actuales (opcional)
  obtenerViajesAceptados() {
    return this.viajesAceptados.getValue();
  }
}
