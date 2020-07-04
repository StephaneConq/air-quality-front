import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirvisualService {

  constructor(
    private http: HttpClient
  ) { }

  getDataFromCoordinates(lat, lng) {
    return this.http.get(`/api/air_quality?lat=${lat}&lng=${lng}`);
  }

  getDataFromCity(city: {cityName: string, countryName: string, stateName: string}) {
    return this.http.get(`/api/air_quality?city=${city.cityName}&country=${city.countryName}&state=${city.stateName}`);
  }
}
