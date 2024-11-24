import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage {
  scanResult: string | null = null;

  constructor(
    private modalCtrl: ModalController,
    private barcodeScanner: BarcodeScanner
  ) {}

  // Método para iniciar el escaneo
  async startScan() {
    try {
      const result = await this.barcodeScanner.scan();
      this.scanResult = result.text; // Guardar el resultado
      console.log('Escaneo exitoso:', result);
    } catch (error) {
      console.error('Error al escanear QR:', error);
    }
  }

  // Método para cerrar el modal
  closeModal() {
    this.modalCtrl.dismiss(this.scanResult);
  }
}
