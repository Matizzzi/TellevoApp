import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from '../models/user.module';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  user ={} as User;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  
  
  ) { }

  // Método para navegar a otra página
  irAInicioSesion() {
    this.navCtrl.navigateForward('iniciarsesion');
  }
  goToHome() {
    this.navCtrl.navigateRoot('/principal');
  }
  async register(user:User)  {
    if (this.formValidation()) {
      let loader= await this.loadingCtrl.create({
        message: "Espere por favor...."
      })
      await loader.present();
  
  
      try {
        await this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then  (data=>{
          console.log(data);
          this.navCtrl.navigateRoot("home")
        })
        
      } catch (error:any) {
        error.message= "Error al registrarse";
        let errormessage=error.message||error.getLocalizedMessage();
  
        this.showToast(errormessage)
        
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
    showToast(message:string){
      this.toastCtrl.create({
        message:message,
        duration:4000
      }).then(toastData =>toastData.present());
    }
  }
  

