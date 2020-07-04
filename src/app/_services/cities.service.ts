import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  citiesBS = new BehaviorSubject([]);

  constructor(
    private http: HttpClient
  ) { }

  getCities() {
    if (localStorage.getItem('cities')) {
      return of(this.citiesBS.next(JSON.parse(localStorage.getItem('cities'))));
    }
    return this.http.get('/api/cities').pipe(map((data: {cities: string[]}) => {
      this.citiesBS.next(data.cities);
      localStorage.setItem('cities', JSON.stringify(data.cities));
    }));
  }
}
