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

@NgModule({
  declarations: [
    AppComponent,
    CredencialesModalComponent,
    PublicarviajeModalComponent,
    AjustesModalComponent
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
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
