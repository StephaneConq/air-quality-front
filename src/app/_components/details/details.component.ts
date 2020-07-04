import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CityData} from '../../_models/city-data';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() displayData: CityData;
  @Input() noResult = null;
  @Output() closeDetails = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.displayData = null;
    this.closeDetails.emit();
  }

  getAirQuality(aqi) {
    if (aqi <= 50) {
      return {label: 'Bonne', color: '#48e50a'};
    } else if (aqi <= 100) {
      return {label: 'Moyenne', color: '#faff29'};
    } else if (aqi <= 150) {
      return {label: 'Dangereuse pour les plus sensibles', color: '#f18410'};
    } else if (aqi <= 200) {
      return {label: 'Dangereuse', color: '#ff0102'};
    } else if (aqi <= 300) {
      return {label: 'Très dangereuse', color: '#8739be'};
    } else {
      return {label: 'Mortelle', color: '#83222f'};
    }
  }

}
