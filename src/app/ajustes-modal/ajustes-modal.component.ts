import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ajustes-modal',
  templateUrl: './ajustes-modal.component.html',
  styleUrls: ['./ajustes-modal.component.scss'],
})
export class AjustesModalComponent {
  isDarkMode: boolean = false;
  notificationsEnabled: boolean = true;
  locationEnabled: boolean = true;
  soundEnabled: boolean = true;
  privacyEnabled: boolean = true;
  selectedLanguage: string = 'es'; // Predeterminado en español

  constructor(private modalController: ModalController) {}

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  toggleNotifications() {
    console.log('Notificaciones habilitadas:', this.notificationsEnabled);
  }

  toggleLocation() {
    console.log('Ubicación habilitada:', this.locationEnabled);
  }

  toggleSound() {
    console.log('Sonido habilitado:', this.soundEnabled);
  }

  togglePrivacy() {
    console.log('Privacidad habilitada:', this.privacyEnabled);
  }

  changeLanguage() {
    console.log('Idioma cambiado a:', this.selectedLanguage);
  }

  applyChanges() {
    // Lógica para aplicar cambios adicionales si es necesario
    console.log('Cambios aplicados');
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
