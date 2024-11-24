import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationController, ModalController, NavController, AlertController } from '@ionic/angular'; // Asegúrate de importar AlertController
import { ClienteService } from '../services/cliente.service';
import { AuthService } from '../auth.service'; 
import { User } from '../models/user.module';
import { Subscription } from 'rxjs';
import { CredencialesModalComponent } from '../credenciales-modal/credenciales-modal.component';
import { HistorialModalComponent } from '../historial-modal/historial-modal.component';
import { PublicarviajeModalComponent } from '../publicarviaje-modal/publicarviaje-modal.component';
import { AjustesModalComponent } from '../ajustes-modal/ajustes-modal.component'; 
import { ConductorComponent } from '../conductor/conductor.component'; 
import { QrScannerPage } from '../qr-scanner/qr-scanner.page';

@Component({
  selector: 'app-interface-conductor',
  templateUrl: './interface-conductor.page.html',
  styleUrls: ['./interface-conductor.page.scss'],
})
export class InterfaceConductorPage implements OnInit, OnDestroy {
  userData: User | null = null;
  userName: string = 'Invitado';
  private userSubscription!: Subscription;

  constructor(
    private animationCtrl: AnimationController,
    private clienteService: ClienteService,
    private authService: AuthService,
    private modalController: ModalController,
    private navCtrl: NavController,  // Asegúrate de inyectar NavController
    private alertController: AlertController // Añadido para mostrar alertas
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  private async loadUserData() {
    const currentUser = await this.authService.getCurrentUser();
    if (currentUser) {
      this.userSubscription = this.clienteService.obtenerClientePorId(currentUser.uid).subscribe((data) => {
        if (data) {
          this.userData = data;
          this.userName = data.name ?? 'Invitado';
        } else {
          this.userData = null;
        }
      }, (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      });
    } else {
      console.error('No se pudo obtener el usuario actual.');
    }
  }

  async openCredentialsModal() {
    this.animateButton('modal-button');
    const modal = await this.modalController.create({
      component: CredencialesModalComponent, 
      componentProps: { user: this.userData }, 
    });
    await modal.present();
  }

  async openHistoryModal() {
    const modal = await this.modalController.create({
      component: HistorialModalComponent
    });
    await modal.present();
  }

  async openPublicarViajeModal() {
    const modal = await this.modalController.create({
      component: PublicarviajeModalComponent 
    });
    await modal.present();
  }

  async openAjustesModal() {
    const modal = await this.modalController.create({
      component: AjustesModalComponent
    });
    await modal.present();
  }

  // Aquí agregamos el método para abrir el ConductorComponent como un modal
  async openConductorModal() {
    const modal = await this.modalController.create({
      component: ConductorComponent,  // Usamos el componente Conductor
    });
    await modal.present();
  }

  private animateButton(buttonClass: string) {
    const button = document.querySelector(`.${buttonClass}`);
    if (button) {
      const animation = this.animationCtrl.create()
        .addElement(button)
        .duration(500)
        .iterations(1)
        .keyframes([
          { offset: 0, transform: 'scale(1)' },
          { offset: 0.5, transform: 'scale(1.1)' },
          { offset: 1, transform: 'scale(1)' },
        ]);
      animation.play();
    }
  }

  // Método de logout ahora marcado como async y llamado desde la alerta
  async logout() {
    await this.authService.logout();  // Llamar al servicio de logout
    this.navCtrl.navigateRoot('/iniciarsesion');  // Redirigir a la página de inicio de sesión
  }

  // Método para mostrar la alerta de confirmación para cerrar sesión
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¿Seguro que quieres salir?',
      message: 'Estás a punto de cerrar sesión.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('El usuario ha cancelado');
          }
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.logout(); // Llamar a logout solo si el usuario confirma
          }
        }
      ]
    });

    await alert.present();
  }

  async openQRModal() {
    const modal = await this.modalController.create({
      component: QrScannerPage, // Componente del escáner QR
    });
  
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Resultado del QR:', result.data); // Manejo del resultado
      }
    });
  
    await modal.present();
  }
}
