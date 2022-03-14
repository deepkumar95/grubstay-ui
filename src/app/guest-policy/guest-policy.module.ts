import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestPolicyRoutingModule } from './guest-policy-routing.module';
import { GuestPolicyComponent } from './guest-policy.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    GuestPolicyComponent
  ],
  imports: [
    CommonModule,
    GuestPolicyRoutingModule,
    SharedModule
  ]
})
export class GuestPolicyModule { }
