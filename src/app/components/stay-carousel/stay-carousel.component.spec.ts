import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayCarouselComponent } from './stay-carousel.component';

describe('StayCarouselComponent', () => {
  let component: StayCarouselComponent;
  let fixture: ComponentFixture<StayCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StayCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StayCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
