import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from '../models/user.module';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';// Importa Firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  user = {} as User;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private firestore: AngularFirestore // Añade Firestore aquí
  ) {}

  // Método para navegar a otra página
  irAInicioSesion() {
    this.navCtrl.navigateForward('iniciarsesion');
  }
  
  async register(user: User) {
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: "Espere por favor...."
      });
      await loader.present();
  
      try {
        const credential = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
        console.log(credential);
  
        // Asegúrate de que credential.user no sea null
        if (credential.user) {
          // Guarda los datos adicionales en Firestore
          await this.firestore.collection('users').doc(credential.user.uid).set({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone // Asegúrate de que este campo exista en tu modelo de usuario
          });
  
          this.navCtrl.navigateRoot("home");
        } else {
          this.showToast("Error al registrar el usuario. Inténtalo de nuevo.");
        }
  
      } catch (error: any) {
        const errorMessage = error.message || error.getLocalizedMessage();
        this.showToast(errorMessage);
      }
  
      await loader.dismiss();
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
    if (!this.user.name) {
      this.showToast("Ingrese su nombre");
      return false;
    }
    if (!this.user.lastname) {
      this.showToast("Ingrese su apellido");
      return false;
    }
    // Valida que las contraseñas coincidan (opcional)
    // if (this.user.password !== this.user.confirmPassword) {
    //   this.showToast("Las contraseñas no coinciden");
    //   return false;
    // }
    return true; 
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 4000
    }).then(toastData => toastData.present());
  }
}
