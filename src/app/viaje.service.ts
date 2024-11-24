import { Injectable } from '@angular/core';
import { of } from 'rxjs'; // Importa 'of' de RxJS

@Injectable({
  providedIn: 'root',
})
export class ViajeService {
  private viajes: any[] = []; // Aquí guardaremos los viajes
  private viajesAceptados: any[] = []; // Viajes aceptados por los pasajeros

  constructor() {}

  /**
   * Método para guardar un viaje
   * @param viaje Objeto que contiene la información del viaje
   * @returns Promesa que resuelve con el viaje guardado o un error
   */
  guardarViaje(viaje: any) {
    return new Promise((resolve, reject) => {
      try {
        this.viajes.push(viaje); // Guardamos el viaje en el array
        resolve(viaje);
      } catch (error) {
        reject('Error al guardar el viaje');
      }
    });
  }

  /**
   * Método para obtener todos los viajes
   * @returns Observable que emite la lista de todos los viajes
   */
  obtenerViajes() {
    return of(this.viajes); // Convertimos el array en un observable
  }

  /**
   * Método para obtener los viajes de un conductor específico
   * @param conductorNombre Nombre del conductor
   * @returns Observable que emite los viajes filtrados por conductor
   */
  obtenerViajesDelConductor(conductorNombre: string) {
    return of(this.viajes.filter(viaje => viaje.nombre === conductorNombre)); // Filtramos los viajes por el nombre del conductor
  }

  /**
   * Método para aceptar un viaje por un pasajero
   * @param viajeId ID del viaje
   * @param pasajeroNombre Nombre del pasajero que acepta el viaje
   * @returns Boolean indicando si el viaje fue aceptado
   */
  aceptarViaje(viajeId: string, pasajeroNombre: string) {
    const viaje = this.viajes.find(v => v.id === viajeId);
    if (viaje) {
      viaje.aceptadoPor = pasajeroNombre; // Establecemos el pasajero que acepta el viaje
      this.viajesAceptados.push(viaje); // Lo agregamos a la lista de viajes aceptados
      return true;
    }
    return false;
  }

  /**
   * Método para obtener los viajes aceptados
   * @returns Array con los viajes aceptados
   */
  obtenerViajesAceptados() {
    return this.viajesAceptados; // Retorna los viajes que han sido aceptados
  }
  
}
