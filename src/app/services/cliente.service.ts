import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private firestore: AngularFirestore) {}

  // Método para agregar cliente
  agregarCliente(cliente: any): Promise<any> {
    return this.firestore.collection('clientes').add(cliente);
  }
}
