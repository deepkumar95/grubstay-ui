import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminTreeComponent } from './subadmin-tree.component';

describe('SubadminTreeComponent', () => {
  let component: SubadminTreeComponent;
  let fixture: ComponentFixture<SubadminTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
