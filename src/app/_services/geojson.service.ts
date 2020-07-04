import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeojsonService {

  constructor(
    private http: HttpClient
  ) { }

  getGeojson(cityName: string) {
    return this.http.get(`/api/polygon?city=${cityName}`);
  }
}
