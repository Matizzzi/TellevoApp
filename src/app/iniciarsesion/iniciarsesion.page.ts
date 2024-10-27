import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from '../models/user.module';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.page.html',
  styleUrls: ['./iniciarsesion.page.scss'],
})
export class IniciarsesionPage implements OnInit {
  user={} as User
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) { } 
  ngOnInit() {
  } 

  goToHome() {
    this.navCtrl.navigateRoot('/interface');
  }
  async login(user: User) {
    if (this.formValidation()) {
        let loader = await this.loadingCtrl.create({
            message: "Espere por favor..."
        });
        await loader.present();
  
        // Asegúrate de que email y password sean strings
        const email = user.email || ''; // Si es undefined, asigna una cadena vacía
        const password = user.password || ''; // Igualmente aquí

        try {
            // Intento de iniciar sesión
            await this.afAuth.signInWithEmailAndPassword(email, password).then(data => {
                console.log(data);
                this.navCtrl.navigateRoot("interface"); // Redirigir a la página de inicio
            });
        } catch (error: any) {
            let errorMessage: string;

            // Manejo de errores específicos de Firebase
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
  
            // Mostrar el mensaje personalizado
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
    return true;
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 4000
    }).then(toastData => toastData.present());
  }
}


