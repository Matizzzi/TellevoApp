import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-publicarviaje-modal',
  templateUrl: './publicarviaje-modal.component.html',
  styleUrls: ['./publicarviaje-modal.component.scss'],
})
export class PublicarviajeModalComponent implements OnInit {
  map: any;
  autocomplete: any;
  directionsService: any;
  directionsRenderer: any;

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.loadGoogleMaps();
  }

  loadGoogleMaps() {
    const scriptExists = document.querySelector('script[src*="maps.googleapis.com"]');

    if (!scriptExists) {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=YOUR_API_KEY';
      script.async = true;
      script.defer = true;
      script.onload = () => this.initMap();
      script.onerror = (error) => {
        console.error("Error al cargar Google Maps", error);
      };
      document.body.appendChild(script);
    } else {
      this.initMap();
    }
  }

  initMap() {
    if (window['google'] && window['google'].maps) {
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        this.map = new google.maps.Map(mapContainer, {
          center: { lat: -33.6878, lng: -71.2151 },
          zoom: 12,
        });

        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer({
          map: this.map,
          suppressMarkers: false,
          preserveViewport: false,
        });

        this.autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement);
        this.autocomplete.addListener('place_changed', () => this.onPlaceChanged());
      }
    } else {
      console.error("Google Maps no está disponible");
    }
  }

  onSearchInput(event: any) {
    const query = event.target.value;
    this.autocomplete.setInputValue(query);
  }

  onPlaceChanged() {
    const place = this.autocomplete.getPlace();
    if (place.geometry && place.geometry.location) {
      const origin = { lat: -33.6878, lng: -71.2151 };
      const destination = place.geometry.location;

      const request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      this.directionsService.route(request, (result: any, status: any) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsRenderer.setDirections(result);
          const bounds = new google.maps.LatLngBounds();
          result.routes[0].overview_path.forEach((location: any) => {
            bounds.extend(location);
          });
          this.map.fitBounds(bounds);
        } else {
          console.error("No se pudo calcular la ruta: " + status);
        }
      });
    } else {
      console.error("El lugar seleccionado no tiene información de ubicación.");
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  volver() {
    this.dismiss();
  }
}
