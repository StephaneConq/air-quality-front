import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {GeocodeService} from '../../_services/geocode.service';
import {PreloaderService} from '../../_services/preloader.service';
import {AirvisualService} from '../../_services/airvisual.service';
import {CityData} from '../../_models/city-data';
import GeocoderResult = google.maps.GeocoderResult;
import {GeojsonService} from '../../_services/geojson.service';
import PolygonOptions = google.maps.PolygonOptions;
import LatLng = google.maps.LatLng;
import {GoogleMap} from '@angular/google-maps';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ResponsiveService} from '../../_services/responsive.service';
import {BehaviorSubject} from 'rxjs';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {DetailsMobileComponent} from '../details-mobile/details-mobile.component';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit {

  constructor(
    private changeDetection: ChangeDetectorRef,
    private geocodeService: GeocodeService,
    private preloaderService: PreloaderService,
    private airvisualService: AirvisualService,
    private geojsonService: GeojsonService,
    private snackBar: MatSnackBar,
    private responsiveService: ResponsiveService,
    private bottomSheet: MatBottomSheet
  ) {
  }

  @ViewChild(GoogleMap, {static: false}) map: GoogleMap;
  @ViewChild('map-polygon') polygon: google.maps.Polygon;
  center = {lat: 1, lng: 1};
  zoom = 14;
  cityData: CityData = null;
  noResult = null;
  polygonOption: PolygonOptions = null;
  options: google.maps.MapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
    gestureHandling: 'greedy'
  };

  ngOnInit(): void {
    this.responsiveService.mobileDetailsBS.subscribe(value => {
      if (value) {
        this.bottomSheet.open(DetailsMobileComponent, {
          hasBackdrop: false,
          data: value
        });
      } else {
        this.polygonOption = null;
        this.cityData = null;
      }
    });
  }

  ngAfterViewInit() {
    navigator.geolocation.getCurrentPosition(geo => {
      this.center = {
        lat: geo.coords.latitude,
        lng: geo.coords.longitude,
      };
      this.updateCityDetails(geo.coords.latitude, geo.coords.longitude);
      this.preloaderService.display = false;
      this.changeDetection.detectChanges();
    });
  }

  updateCityDetails(lat, lng, geoResult: GeocoderResult = null) {
    this.preloaderService.display = true;
    this.polygonOption = null;
    this.noResult = null;
    this.center = {
      lat,
      lng
    };
    let details = {
      cityName: '',
      stateName: '',
      countryName: ''
    };
    new Promise(async (resolve, reject) => {
      const data = geoResult ? [geoResult] : await this.geocodeService.geocode(lat, lng);
      details = {
        cityName: data[0].address_components.find(ac => ac.types.includes('locality')).long_name,
        stateName: data[0].address_components.find(ac => ac.types.includes('administrative_area_level_1')).long_name,
        countryName: data[0].address_components.find(ac => ac.types.includes('country')).long_name
      };
      this.setBounds(details.cityName);
      const cityDetails = await this.airvisualService.getDataFromCity(details).toPromise();
      if (cityDetails['status'] === 'success') {
        this.cityData = cityDetails['data'];
        if (this.responsiveService.isMobile) {
          this.responsiveService.mobileDetailsBS.next({
            displayData: this.cityData,
            noResult: null
          });
        }
        resolve();
      } else {
        this.cityData = null;
        this.airvisualService.getDataFromCoordinates(lat, lng).subscribe((data2: { status: string, data: CityData }) => {
          if (data2.status === 'success') {
            this.cityData = data2.data;
            if (details.cityName !== data2.data.city) {
              this.noResult = {
                message: `Pas de résultats pour ${details.cityName}, résultats pour ${data2.data.city}`,
                target: details.cityName,
                replacement: data2.data.city
              };
              this.snackBar.open(`Pas de données pour ${details.cityName}`, 'Fermer', {
                duration: 2000
              });
            }
            if (this.responsiveService.isMobile) {
              this.responsiveService.mobileDetailsBS.next({
                displayData: this.cityData,
                noResult: this.noResult
              });
            }
            resolve();
          }
        }, error1 => {
          console.error('error', error1);
          reject(error1);
        });
      }
    }).then(() => {
      this.preloaderService.display = false;
    });
  }

  setBounds(cityName) {
    return new Promise(resolve => {
      this.geojsonService.getGeojson(cityName).subscribe((data) => {
        if (!data['polygon']) {
          // this.preloaderService.display = false;
          return;
        }
        let coordinates = data['polygon']['coordinates'];
        if (coordinates.length === 1) {
          coordinates = coordinates[0];
        }
        this.polygonOption = {
          paths: coordinates.map(c => new LatLng(c[1], c[0])),
          fillColor: '#9c27b0',
          fillOpacity: 0.1,
          strokeColor: '#9c27b0',
          strokeOpacity: 0.2
        };
        const bounds = new google.maps.LatLngBounds();
        this.polygonOption.paths.forEach(p => {
          bounds.extend(p);
        });
        this.map.fitBounds(bounds);
        resolve();
      });
    });
  }

  get isLoading() {
    return this.preloaderService.display;
  }

  mapClick(event) {
    if (this.isLoading) {
      this.preloaderService.display = false;
    }
    this.updateCityDetails(event.latLng.lat(), event.latLng.lng());
  }

  selectCity(cityName) {
    this.geocodeService.reverseGeocode(cityName).then((res: GeocoderResult[]) => {
      if (res.length === 0) {
        return this.snackBar.open(`${cityName} non trouvé en France`, 'Fermer', {
          duration: 2000
        });
      }
      const frRes = res[0];
      this.cityData = null;
      this.updateCityDetails(frRes.geometry.location.lat(), frRes.geometry.location.lng(), frRes);
    });
  }

  get isMobile() {
    return this.responsiveService.isMobile;
  }
}
