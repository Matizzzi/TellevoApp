import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViajeService {
  private collectionName = 'viajes'; // Nombre de la colección en Firestore

  constructor(private firestore: AngularFirestore) {}

  // Método para guardar un viaje
  guardarViaje(viaje: any): Promise<any> {
    return this.firestore
      .collection(this.collectionName)
      .add(viaje) // Agrega el viaje a la colección
      .then(docRef => {
        console.log('Viaje guardado con ID:', docRef.id);
        return { id: docRef.id, ...viaje }; // Retorna el ID junto con los datos
      })
      .catch(error => {
        console.error('Error al guardar el viaje:', error);
        throw error;
      });
  }

  // Método para obtener todos los viajes
  obtenerViajes(): Observable<any[]> {
    return this.firestore
      .collection(this.collectionName)
      .valueChanges({ idField: 'id' }); // Incluye el ID del documento
  }

  // Método para obtener los viajes de un conductor específico
  obtenerViajesDelConductor(conductorNombre: string): Observable<any[]> {
    return this.firestore
      .collection(this.collectionName, ref => ref.where('nombre', '==', conductorNombre))
      .valueChanges({ idField: 'id' });
  }

  // Método para aceptar un viaje por un pasajero
  aceptarViaje(viajeId: string, pasajeroNombre: string): Promise<void> {
    return this.firestore
      .collection(this.collectionName)
      .doc(viajeId)
      .update({
        aceptadoPor: pasajeroNombre,
        estado: 'tomado',
      })
      .then(() => console.log('Viaje aceptado'))
      .catch(error => {
        console.error('Error al aceptar el viaje:', error);
        throw error;
      });
  }

  // Método para obtener los viajes aceptados
  obtenerViajesAceptados(): Observable<any[]> {
    return this.firestore
      .collection(this.collectionName, ref => ref.where('estado', '==', 'tomado'))
      .valueChanges({ idField: 'id' }); // Incluye el ID del documento
  }
}
