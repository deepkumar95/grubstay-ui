import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgGalleryDialogComponent } from './pg-gallery-dialog.component';

describe('PgGalleryDialogComponent', () => {
  let component: PgGalleryDialogComponent;
  let fixture: ComponentFixture<PgGalleryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgGalleryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgGalleryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
