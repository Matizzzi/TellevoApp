import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.module'; // Asegúrate de que este modelo esté correctamente definido 

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private firestore: AngularFirestore) {}

  // Método para agregar cliente
  agregarCliente(cliente: any): Promise<any> {
    return this.firestore.collection('users').add(cliente);
  }

  // Método para obtener datos de un cliente por su ID
  obtenerClientePorId(userId: string): Observable<User | undefined> {
    return this.firestore.collection<User>('users').doc(userId).valueChanges();
  }

  // Método para obtener todos los usuarios
  obtenerTodosLosClientes(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges();
  }
}
