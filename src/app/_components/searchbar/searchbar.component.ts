import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {CitiesService} from '../../_services/cities.service';
import {PreloaderService} from '../../_services/preloader.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  filteredOptions = [];
  searchModel = '';
  @Output() selectCityEvent = new EventEmitter();
  resolveCities = null;
  qCities = new Promise(resolve => this.resolveCities = resolve);

  constructor(
    private citiesService: CitiesService,
    private preloaderService: PreloaderService
  ) {
  }

  ngOnInit() {
    this.citiesService.citiesBS.subscribe(cities => {
      this.resolveCities();
    });
    this.citiesService.getCities().subscribe();
  }

  async search(event: string) {
    await this.qCities;
    let i = 0;
    this.filteredOptions = event.length > 0 ? this.cities.filter(c => {
      if (i >= 5) {
        return false;
      }
      if (c.toLowerCase().includes(event)) {
        i++;
        return true;
      }
      return false;
    }) : [];
  }

  get cities() {
    return this.citiesService.citiesBS.getValue();
  }

  selectCity(city) {
    this.filteredOptions = [];
    if (this.preloaderService.display) {
      this.preloaderService.display = false;
    }
    this.searchModel = '';
    this.selectCityEvent.emit(city);
  }

}
