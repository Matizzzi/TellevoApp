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
    // Verifica si ya se está en modo oscuro al iniciar el componente
    this.isDarkMode = document.body.classList.contains('dark');
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    // Cambia la clase en el cuerpo del documento para aplicar el tema
    document.body.classList.toggle('dark', this.isDarkMode);
    document.body.classList.toggle('light', !this.isDarkMode);
  }

  applyChanges() {
    // Aquí puedes agregar lógica si necesitas aplicar algo adicional al guardar cambios
    console.log('Modo oscuro aplicado:', this.isDarkMode);
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
  