import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPgComponent } from './add-pg.component';

describe('AddPgComponent', () => {
  let component: AddPgComponent;
  let fixture: ComponentFixture<AddPgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
