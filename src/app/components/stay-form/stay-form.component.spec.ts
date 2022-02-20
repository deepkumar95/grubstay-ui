import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayFormComponent } from './stay-form.component';

describe('StayFormComponent', () => {
  let component: StayFormComponent;
  let fixture: ComponentFixture<StayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StayFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
