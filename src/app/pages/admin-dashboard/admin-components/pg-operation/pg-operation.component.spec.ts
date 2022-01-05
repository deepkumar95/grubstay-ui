import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgOperationComponent } from './pg-operation.component';

describe('PgOperationComponent', () => {
  let component: PgOperationComponent;
  let fixture: ComponentFixture<PgOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
