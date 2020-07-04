import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {CityData} from '../../_models/city-data';
import {ResponsiveService} from '../../_services/responsive.service';

@Component({
  selector: 'app-details-mobile',
  templateUrl: './details-mobile.component.html',
  styleUrls: ['./details-mobile.component.scss']
})
export class DetailsMobileComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<DetailsMobileComponent>,
    private responsiveService: ResponsiveService,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: {
      displayData: CityData,
      noResult: {
        message: string,
        target: string,
        replacement: string
      }
    }
  ) {
  }

  displayData = null;
  noResult = null;

  ngOnInit(): void {
    this.displayData = this.data.displayData;
    this.noResult = this.data.noResult;
  }

  close() {
    this.bottomSheetRef.dismiss();
    this.responsiveService.mobileDetailsBS.next(null);
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
