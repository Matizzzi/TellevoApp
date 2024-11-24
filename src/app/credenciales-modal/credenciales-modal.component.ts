import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-credenciales-modal',
  templateUrl: './credenciales-modal.component.html',
  styleUrls: ['./credenciales-modal.component.scss'],
})
export class CredencialesModalComponent {
  @Input() user: any;
  isAnimated: boolean = false;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.animateCodeSection();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  private animateCodeSection() {
    setTimeout(() => {
      this.isAnimated = true;
    }, 500); // Espera 500ms antes de mostrar la animación
  }
}
