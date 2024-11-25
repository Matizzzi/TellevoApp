import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { GoogleMapsModule } from '@angular/google-maps';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

// Importar tus componentes
import { CredencialesModalComponent } from './credenciales-modal/credenciales-modal.component';
import { PublicarviajeModalComponent } from './publicarviaje-modal/publicarviaje-modal.component';
import { AjustesModalComponent } from './ajustes-modal/ajustes-modal.component';
import { BuscarViajeComponent } from './buscar-viaje/buscar-viaje.component';
import { HistorialModalComponent } from './historial-modal/historial-modal.component';
import { ConductorComponent } from './conductor/conductor.component'; // Asegúrate de que la ruta sea correcta

// Importa el módulo que contiene el componente QrScannerPage


@NgModule({
  declarations: [
    AppComponent,
    CredencialesModalComponent,
    PublicarviajeModalComponent,
    AjustesModalComponent,
    BuscarViajeComponent,
    HistorialModalComponent,
    ConductorComponent,  // Agrega este componente
    // QrScannerPage está incluido dentro del QrScannerPageModule, no lo declares aquí
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    AngularFireAuthModule,
    GoogleMapsModule,
    FormsModule,
// Solo importa el módulo aquí
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
