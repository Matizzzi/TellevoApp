import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ajustes-modal',
  templateUrl: './ajustes-modal.component.html',
  styleUrls: ['./ajustes-modal.component.scss'],
})
export class AjustesModalComponent {
  isDarkMode: boolean;

  constructor(private modalController: ModalController) {
    this.isDarkMode = document.body.classList.contains('dark');
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  applyChanges() {
    // Lógica para aplicar cambios, si es necesario
    console.log('Modo oscuro aplicado:', this.isDarkMode);
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
