import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from '../models/user.module';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.page.html',
  styleUrls: ['./iniciarsesion.page.scss'],
})
export class IniciarsesionPage implements OnInit {
  user = {} as User;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async login(user: User) {
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: "Espere por favor..."
      });
      await loader.present();

      const email = user.email || '';
      const password = user.password || '';

      try {
        const data = await this.afAuth.signInWithEmailAndPassword(email, password);

        if (data && data.user) {
          // Obtener información del usuario desde Firestore
          this.firestore.collection('users').doc(data.user.uid).get().subscribe(userData => {
            if (userData.exists) {
              const userInfo = userData.data() as User;

              if (userInfo && userInfo.role) { // Cambiado a 'role'
                if (userInfo.role === "conductor") {
                  this.navCtrl.navigateRoot("interface-conductor");
                } else if (userInfo.role === "cliente") {
                  this.navCtrl.navigateRoot("interface");
                } else {
                  this.showToast("Rol no válido");
                }
              } else {
                this.showToast("No se encontró información del rol del usuario.");
              }
            } else {
              this.showToast("Usuario no encontrado en la base de datos.");
            }
            loader.dismiss();
          });
        } else {
          this.showToast("Error al obtener datos del usuario.");
          loader.dismiss();
        }

      } catch (error: any) {
        let errorMessage: string;

        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'El correo electrónico no tiene un formato válido';
            break;
          case 'auth/user-not-found':
            errorMessage = 'Usuario no registrado';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Contraseña incorrecta';
            break;
          default:
            errorMessage = 'Error al iniciar sesión. Intente nuevamente.';
        }

        this.showToast(errorMessage);
        loader.dismiss();
      }
    }
  }

  formValidation() {
    if (!this.user.email) {
      this.showToast("Ingrese un correo");
      return false;
    }
    if (!this.user.password) {
      this.showToast("Ingrese una contraseña");
      return false;
    }
    return true;
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 4000
    }).then(toastData => toastData.present());
  }
}
