import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.page.html',
  styleUrls: ['./iniciarsesion.page.scss'],
})
export class IniciarsesionPage implements OnInit {

  constructor(private navCtrl: NavController) { } // Inyecta NavController

  ngOnInit() {
  } 

  goToHome() {
    this.navCtrl.navigateRoot('/principal');
  }

}
