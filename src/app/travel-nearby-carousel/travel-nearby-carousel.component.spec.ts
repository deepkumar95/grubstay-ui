import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelNearbyCarouselComponent } from './travel-nearby-carousel.component';

describe('TravelNearbyCarouselComponent', () => {
  let component: TravelNearbyCarouselComponent;
  let fixture: ComponentFixture<TravelNearbyCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelNearbyCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelNearbyCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
