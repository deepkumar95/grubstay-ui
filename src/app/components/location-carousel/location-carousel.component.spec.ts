import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCarouselComponent } from './location-carousel.component';

describe('LocationCarouselComponent', () => {
  let component: LocationCarouselComponent;
  let fixture: ComponentFixture<LocationCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
