import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayPgComponent } from './stay-pg.component';

describe('StayPgComponent', () => {
  let component: StayPgComponent;
  let fixture: ComponentFixture<StayPgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StayPgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StayPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
