import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';

declare var google: any;

interface AutocompleteItem {
  description: string;
  // Puedes agregar más propiedades según sea necesario
}

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.page.html',
  styleUrls: ['./ruta.page.scss'],
})
export class RutaPage {
  carrito: any[] = [];
  input = '';
  autocompleteItems: AutocompleteItem[] = [];
  distancia = '';
  duracion = '';
  @ViewChild('map') mapElement: ElementRef | undefined;
  public map: any;
  public start: string = 'Duoc UC: Sede Melipilla - Serrano, Melipilla, Chile';
  public end: string = '';
  public directionsService: any;
  public directionsDisplay: any;

  constructor(private platform: Platform, private zone: NgZone) {}

  ionViewDidEnter() {
    if (localStorage.getItem('carrito')) {
      this.carrito = JSON.parse(localStorage.getItem('carrito')!);
      this.platform.ready().then(() => {
        this.initMap();
      });
    }
  }

  initMap() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();

    let mapOptions = {
      zoom: 5,
      zoomControl: false,
      scaleControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(this.mapElement!.nativeElement, mapOptions);
    let infoWindow = new google.maps.InfoWindow();

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Estas aquí.');
          infoWindow.open(this.map);
          this.map.setCenter(pos);
        }
      );
    }

    this.directionsDisplay.setMap(this.map);
    this.calculateAndDisplayRoute();
  }

  calculateAndDisplayRoute() {
    this.directionsService.route(
      {
        origin: this.start,
        destination: this.end,
        travelMode: 'DRIVING',
      },
      (response: any, status: string) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
          const route = response.routes[0];
          const leg = route.legs[0];

          // Distancia total
          const distanceInKilometers = (leg.distance.value / 1000).toFixed(2);
          console.log(`Distancia: ${distanceInKilometers} km`);
          this.distancia = `${distanceInKilometers} km`;

          // Tiempo de viaje
          const durationInSeconds = leg.duration.value;
          const minutes = Math.floor(durationInSeconds / 60); // minutos
          const seconds = durationInSeconds % 60; // segundos
          const formattedDuration = `${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

          console.log(`Duración: ${formattedDuration} (mm:ss)`);
          this.duracion = `${formattedDuration}`;

          // Información sobre origen y destino
          console.log(`Inicio: ${leg.start_address}`);
          console.log(`Destino: ${leg.end_address}`);

          // Tiempo de viaje en tráfico
          if (leg.duration_in_traffic) {
            const durationInTraffic = leg.duration_in_traffic.value / 60;
            console.log(`Tiempo de viaje en tráfico: ${durationInTraffic} minutos`);
          }

          // Detalles de los pasos
          leg.steps.forEach((step: any, index: number) => {
            const stepDistance = step.distance.value / 1000; // en km
            const stepDuration = step.duration.value / 60; // en minutos
            console.log(`Paso ${index + 1}: ${step.instructions}, Distancia: ${stepDistance} km, Tiempo: ${stepDuration} minutos`);
          });
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }

  updateSearchResults() {
    let GoogleAutocomplete = new google.maps.places.AutocompleteService();
    if (this.end === '') {
      this.autocompleteItems = [];
      return;
    }

    GoogleAutocomplete.getPlacePredictions({ input: this.end }, (predictions: any, status: any) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction: any) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  selectSearchResult(item: AutocompleteItem) {
    this.end = item.description;
    this.autocompleteItems = [];
    this.initMap();
  }
}
