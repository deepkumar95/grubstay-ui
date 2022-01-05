import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgOpDialogComponent } from './pg-op-dialog.component';

describe('PgOpDialogComponent', () => {
  let component: PgOpDialogComponent;
  let fixture: ComponentFixture<PgOpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgOpDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgOpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
