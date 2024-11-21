import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Importa AngularFirestore

@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  agregarViajeAceptado(viaje: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private firestore: AngularFirestore) { }

  // Guarda un nuevo viaje en Firestore
  guardarViaje(viaje: any) {
    return this.firestore.collection('viajes').add(viaje);  // Guarda en la colección 'viajes'
  }

  // Obtiene todos los viajes guardados desde Firestore
  obtenerViajes() {
    return this.firestore.collection('viajes').valueChanges();  // Obtiene los viajes
  }
}
