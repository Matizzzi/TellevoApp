import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationController, ModalController, NavController, AlertController } from '@ionic/angular';
import { ClienteService } from '../services/cliente.service';
import { AuthService } from '../auth.service'; 
import { User } from '../models/user.module';
import { Subscription } from 'rxjs';
import { CredencialesModalComponent } from '../credenciales-modal/credenciales-modal.component';
import { HistorialModalComponent } from '../historial-modal/historial-modal.component';
import { PublicarviajeModalComponent } from '../publicarviaje-modal/publicarviaje-modal.component';
import { AjustesModalComponent } from '../ajustes-modal/ajustes-modal.component'; 
import { ConductorComponent } from '../conductor/conductor.component'; 

@Component({
  selector: 'app-interface-conductor',
  templateUrl: './interface-conductor.page.html',
  styleUrls: ['./interface-conductor.page.scss'],
})
export class InterfaceConductorPage implements OnInit, OnDestroy {
  userData: User | null = null;
  userName: string = 'Invitado';
  private userSubscription!: Subscription;
  currentTime: string = '';

  constructor(
    private animationCtrl: AnimationController,
    private clienteService: ClienteService,
    private authService: AuthService,
    private modalController: ModalController,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadUserData();
    this.startClock();
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

  // Función para actualizar la hora cada segundo
  private startClock() {
    setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    }, 1000); // Actualiza cada segundo
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

  async openConductorModal() {
    const modal = await this.modalController.create({
      component: ConductorComponent,
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

  async logout() {
    await this.authService.logout();
    this.navCtrl.navigateRoot('/iniciarsesion');
  }

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
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  // Agregar las funciones que faltaban

  goToTutorial() {
    // Aquí agregas la lógica para ir al tutorial
    this.navCtrl.navigateForward('/tutorial'); // Por ejemplo, navegar a una página de tutorial
  }

  redirectToColocolo() {
    // Aquí agregas la lógica para redirigir a Colocolo
    window.location.href = 'https://www.colocolo.cl'; // Cambiar la URL según corresponda
  }
}
