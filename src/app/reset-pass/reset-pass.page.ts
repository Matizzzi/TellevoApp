import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage implements OnInit {
  user = { email: '' }; // Inicializa el objeto user con el campo email

  constructor(
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async resetPassword(email: string) {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      this.showToast('Se ha enviado un enlace para restablecer tu contraseña');
      this.navCtrl.navigateRoot('/iniciarsesion');
    } catch (error) {
      this.showToast('Error al enviar el enlace. Verifica tu correo.');
    }
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 4000
    }).then(toast => toast.present());
  }
}