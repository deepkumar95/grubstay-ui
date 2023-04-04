import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SublocationDialogComponent } from './sublocation-dialog.component';

describe('SublocationDialogComponent', () => {
  let component: SublocationDialogComponent;
  let fixture: ComponentFixture<SublocationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SublocationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SublocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
