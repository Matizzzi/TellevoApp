import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-publicarviaje-modal',
  templateUrl: './publicarviaje-modal.component.html',
  styleUrls: ['./publicarviaje-modal.component.scss'],
})
export class PublicarviajeModalComponent {

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }
}
