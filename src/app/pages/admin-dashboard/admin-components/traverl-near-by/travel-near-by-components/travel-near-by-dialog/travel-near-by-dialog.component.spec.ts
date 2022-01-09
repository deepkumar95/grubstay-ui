import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelNearByDialogComponent } from './travel-near-by-dialog.component';

describe('TravelNearByDialogComponent', () => {
  let component: TravelNearByDialogComponent;
  let fixture: ComponentFixture<TravelNearByDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelNearByDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelNearByDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
