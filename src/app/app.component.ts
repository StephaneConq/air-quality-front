import { Component } from '@angular/core';
import {PreloaderService} from './_services/preloader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private preloaderService: PreloaderService
  ) {
  }

  get displayPreloader() {
    return this.preloaderService.display;
  }
}
