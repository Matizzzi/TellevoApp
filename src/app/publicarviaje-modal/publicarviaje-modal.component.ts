import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ViajeService } from '../viaje.service'; // Importa el servicio

declare var google: any;

@Component({
  selector: 'app-publicarviaje-modal',
  templateUrl: './publicarviaje-modal.component.html',
  styleUrls: ['./publicarviaje-modal.component.scss'],
})
export class PublicarviajeModalComponent implements OnInit {
  carModel: string = '';
  carPlate: string = '';
  carBrand: string = '';
  carCapacity: number | null = null;
  tripPrice: number | null = null;

  map: any;
  autocomplete: any;
  placesService: any;
  directionsService: any;
  directionsRenderer: any;
  suggestions: any[] = [];
  selectedPlace: any;

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  constructor(
    private router: Router,
    private viajeService: ViajeService // Inyecta el servicio
  ) {}

  ngOnInit() {
    this.loadGoogleMaps();
  }

  loadGoogleMaps() {
    const scriptExists = document.querySelector('script[src*="maps.googleapis.com"]');

    if (!scriptExists) {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places,directions&key=YOUR_API_KEY';
      script.async = true;
      script.defer = true;
      script.onload = () => this.initMap();
      script.onerror = (error) => {
        console.error('Error al cargar Google Maps', error);
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
          center: { lat: -33.6878, lng: -71.2151 }, // Ejemplo: Santiago
          zoom: 12,
        });

        // Instanciamos los servicios
        this.placesService = new google.maps.places.AutocompleteService();
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer({
          polylineOptions: {
            strokeColor: '#FF0000', // Rojo
            strokeOpacity: 0.7,
            strokeWeight: 5,
          },
        });
        this.directionsRenderer.setMap(this.map);
      }
    } else {
      console.error('Google Maps no está disponible');
    }
  }

  onSearch(event: any) {
    const query = event.target.value;

    if (query.length > 2) {
      this.placesService.getPlacePredictions(
        { input: query, componentRestrictions: { country: 'cl' } },
        (predictions: any[], status: any) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.suggestions = predictions;
          } else {
            console.error('Error al obtener predicciones:', status);
            this.suggestions = [];
          }
        }
      );
    } else {
      this.suggestions = [];
    }
  }

  onPlaceSelected(suggestion: any) {
    const placeId = suggestion.place_id;

    const placesDetailsService = new google.maps.places.PlacesService(this.map);
    placesDetailsService.getDetails({ placeId }, (place: any, status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.selectedPlace = place;
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(15);

        new google.maps.Marker({
          position: place.geometry.location,
          map: this.map,
          title: place.name,
        });

        console.log('Lugar seleccionado:', this.selectedPlace);
      }
    });

    this.suggestions = []; // Limpiamos las sugerencias después de seleccionar un lugar
  }

  getRoute() {
    if (!this.selectedPlace) {
      alert('Por favor, selecciona un lugar primero');
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const destination = this.selectedPlace.geometry.location;

        const request = {
          origin: userLocation,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        };

        this.directionsService.route(request, (result: any, status: any) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.directionsRenderer.setDirections(result);
          } else {
            console.error('Error al calcular la ruta:', status);
            alert('No se pudo calcular la ruta');
          }
        });
      });
    } else {
      alert('Geolocalización no disponible');
    }
  }

  // Método para guardar la información del viaje
  submitTripInfo() {
    if (!this.carModel || !this.carPlate || !this.carBrand || !this.carCapacity || !this.tripPrice) {
      alert('Por favor, completa toda la información del viaje.');
      return;
    }

    const viaje = {
      modelo: this.carModel,
      patente: this.carPlate,
      marca: this.carBrand,
      capacidad: this.carCapacity,
      precio: this.tripPrice,
      lugar: this.selectedPlace ? this.selectedPlace.name : ''
    };

    this.viajeService.guardarViaje(viaje); // Llamamos al servicio para guardar el viaje
    alert('Información del viaje guardada correctamente.');
  }

  goBack() {
    this.router.navigate(['interface-conductor']);
  }
}
