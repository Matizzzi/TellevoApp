import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationController, ModalController, NavController } from '@ionic/angular';
import { ClienteService } from '../services/cliente.service';
import { AuthService } from '../auth.service';
import { User } from '../models/user.module';
import { Subscription } from 'rxjs';
import { CredencialesModalComponent } from '../credenciales-modal/credenciales-modal.component'; // Ajusta la ruta
import { HistorialModalComponent } from '../historial-modal/historial-modal.component';
import { BuscarViajeComponent } from '../buscar-viaje/buscar-viaje.component'; // Asegúrate de importar el modal de Buscar Viaje

@Component({
  selector: 'app-interface',
  templateUrl: './interface.page.html',
  styleUrls: ['./interface.page.scss'],
})
export class InterfacePage implements OnInit, OnDestroy {
  userData: User | null = null;
  userName: string = 'Invitado';
  private userSubscription!: Subscription;

  constructor(
    private animationCtrl: AnimationController,
    private clienteService: ClienteService,
    private authService: AuthService,
    private modalController: ModalController,
    private navCtrl: NavController
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

  // Método de cerrar sesión
  async logout() {
    await this.authService.logout();
    this.navCtrl.navigateRoot('/iniciarsesion'); // Redirige a la página de inicio de sesión
  }
}
