import {Injectable} from '@angular/core';
import GeocoderComponentRestrictions = google.maps.GeocoderComponentRestrictions;

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  geocoder = null;

  constructor() {
    this.geocoder = new google.maps.Geocoder();
  }

  geocode(lat: number, lng: number) {
    return new Promise(resolve => {
      const latLng = new google.maps.LatLng(lat, lng);
      this.geocoder.geocode({location: latLng}, (res, status) => {
        resolve(res);
      });
    });
  }

  reverseGeocode(address) {
    const componentRestrictions: GeocoderComponentRestrictions = {
      country: 'France'
    };
    return new Promise(resolve => {
      this.geocoder.geocode({address, componentRestrictions}, (res, status) => {
        resolve(res);
      });
    });
  }
}
