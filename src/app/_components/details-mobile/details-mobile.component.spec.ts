import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMobileComponent } from './details-mobile.component';

describe('DetailsMobileComponent', () => {
  let component: DetailsMobileComponent;
  let fixture: ComponentFixture<DetailsMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
