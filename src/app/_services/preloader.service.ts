import {ChangeDetectorRef, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {

  display = true;

  constructor(
  ) { }
}
