import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HistorialService } from '../historial.service'; // Importamos el servicio

@Component({
  selector: 'app-historial-modal',
  templateUrl: './historial-modal.component.html',
  styleUrls: ['./historial-modal.component.scss'],
})
export class HistorialModalComponent implements OnInit {
  @Input() viaje: any; // Recibe el viaje aceptado
  historial: any[] = [];

  constructor(
    private modalController: ModalController,
    private historialService: HistorialService // Inyectamos el servicio
  ) {}

  ngOnInit() {
    // Obtenemos el historial al abrir el modal
    this.historial = this.historialService.obtenerHistorial();
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
