import { NgModule } from '@angular/core';
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
import { PublicarviajeModalComponent } from './publicarviaje-modal/publicarviaje-modal.component';  // Importar el nuevo componente modal

@NgModule({
  declarations: [
    AppComponent,
    CredencialesModalComponent, // Declarar el componente CredencialesModal
    PublicarviajeModalComponent  // Declarar el componente PublicarviajeModal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    AngularFireAuthModule,
    GoogleMapsModule,
    FormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
