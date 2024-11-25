import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationController, ModalController, NavController, AlertController } from '@ionic/angular';
import { ClienteService } from '../services/cliente.service';
import { AuthService } from '../auth.service';
import { User } from '../models/user.module';
import { Subscription } from 'rxjs';
import { CredencialesModalComponent } from '../credenciales-modal/credenciales-modal.component';
import { HistorialModalComponent } from '../historial-modal/historial-modal.component';
import { BuscarViajeComponent } from '../buscar-viaje/buscar-viaje.component';
import { AjustesModalComponent } from '../ajustes-modal/ajustes-modal.component'; // Importa el componente de ajustes

@Component({
  selector: 'app-interface',
  templateUrl: './interface.page.html',
  styleUrls: ['./interface.page.scss'],
})
export class InterfacePage implements OnInit, OnDestroy {
  userData: User | null = null;
  userName: string = 'Invitado';
  currentTime: string = '';
  private userSubscription!: Subscription;

  constructor(
    private animationCtrl: AnimationController,
    private clienteService: ClienteService,
    private authService: AuthService,
    private modalController: ModalController,
    private navCtrl: NavController,
    private alertController: AlertController // Añadido para mostrar alertas
  ) {}

  ngOnInit() {
    this.loadUserData();
    this.updateTime();
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

  // Método para actualizar la hora
  updateTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    this.currentTime = formattedTime;
  }

  // Método para abrir el modal de Credenciales
  async openCredentialsModal() {
    this.animateButton('modal-button');
    const modal = await this.modalController.create({
      component: CredencialesModalComponent,
      componentProps: { user: this.userData },
    });
    await modal.present();
  }

  // Método para abrir el modal de Historial
  async openHistoryModal() {
    const modal = await this.modalController.create({
      component: HistorialModalComponent
    });
    await modal.present();
  }

  // Método para abrir el modal de Buscar Viaje
  async openBuscarViajeModal() {
    const modal = await this.modalController.create({
      component: BuscarViajeComponent
    });
    await modal.present();
  }

  // Método para abrir el modal de Ajustes
  async openAjustesModal() {
    const modal = await this.modalController.create({
      component: AjustesModalComponent,  // El componente de ajustes
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

  // Método para mostrar el alerta de confirmación para cerrar sesión
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
          text: 'Salir',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  // Método de cerrar sesión
  async logout() {
    await this.authService.logout();
    this.navCtrl.navigateRoot('/iniciarsesion'); // Redirige a la página de inicio de sesión
  }

  redirectToColocolo() {
    // Redirige a la nueva URL
    window.location.href = 'https://matizzzi.github.io/FormularioPrueba/';
  }
  goToTutorial() {
    this.navCtrl.navigateForward('/tutorial'); // Asume que la ruta /tutorial existe en tu configuración de rutas
  }
  
}
