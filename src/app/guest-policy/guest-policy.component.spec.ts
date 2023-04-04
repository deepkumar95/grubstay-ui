import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPolicyComponent } from './guest-policy.component';

describe('GuestPolicyComponent', () => {
  let component: GuestPolicyComponent;
  let fixture: ComponentFixture<GuestPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
