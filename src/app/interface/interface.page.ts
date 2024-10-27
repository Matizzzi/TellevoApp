import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { ClienteService } from '../services/cliente.service';
import { AuthService } from '../auth.service'; 
import { User } from '../models/user.module';
import { Subscription } from 'rxjs';
import { CredencialesModalComponent } from '../credenciales-modal/credenciales-modal.component'; // Ajusta la ruta
import { HistorialModalComponent } from '../historial-modal/historial-modal.component';

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
    private modalController: ModalController 
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
      component: CredencialesModalComponent, // Asegúrate de que el nombre sea correcto
      componentProps: { user: this.userData }, // Si necesitas pasar datos al modal
    });
    await modal.present();
  }
  async openHistoryModal() {
    const modal = await this.modalController.create({
      component: HistorialModalComponent
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
}
