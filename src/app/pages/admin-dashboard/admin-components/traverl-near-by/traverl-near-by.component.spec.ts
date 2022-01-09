import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraverlNearByComponent } from './traverl-near-by.component';

describe('TraverlNearByComponent', () => {
  let component: TraverlNearByComponent;
  let fixture: ComponentFixture<TraverlNearByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraverlNearByComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraverlNearByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
