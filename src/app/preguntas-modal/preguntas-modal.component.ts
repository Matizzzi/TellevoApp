import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preguntas-modal',
  templateUrl: './preguntas-modal.component.html',
  styleUrls: ['./preguntas-modal.component.scss'],
})
export class PreguntasModalComponent {
  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }
}
