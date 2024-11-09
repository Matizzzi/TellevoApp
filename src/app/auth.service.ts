import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthUser } from './models/auth-user.module'; // Importa la interfaz AuthUser

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // Método para obtener el usuario actual
  async getCurrentUser(): Promise<AuthUser | null> {
    const user = await this.afAuth.currentUser;
    if (user) {
      return { 
        email: user.email || '', 
        uid: user.uid 
      } as AuthUser; // Utiliza AuthUser aquí
    }
    return null; // Retorna null si no hay usuario
  }

  // Método para iniciar sesión
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Método para cerrar sesión
  logout() {
    return this.afAuth.signOut();
  }
}
