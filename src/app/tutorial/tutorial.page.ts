import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private navCtrl: NavController) {}

  // Función para ir a la página de inicio
  goToHomePage() {
    this.navCtrl.navigateRoot('/interface');
  }

  // Función para cerrar el tutorial
  closeTutorial() {
    this.navCtrl.navigateBack('/interface');  // O a la página que desees
  }
}
