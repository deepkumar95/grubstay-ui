import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormEquiriesComponent } from './view-form-equiries.component';

describe('ViewFormEquiriesComponent', () => {
  let component: ViewFormEquiriesComponent;
  let fixture: ComponentFixture<ViewFormEquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFormEquiriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFormEquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
