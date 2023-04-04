import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelNearbyComponent } from './travel-nearby.component';

describe('TravelNearbyComponent', () => {
  let component: TravelNearbyComponent;
  let fixture: ComponentFixture<TravelNearbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelNearbyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelNearbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
