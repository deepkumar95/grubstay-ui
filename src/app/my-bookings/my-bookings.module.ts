import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyBookingsRoutingModule } from './my-bookings-routing.module';
import { MyBookingsComponent } from './my-bookings.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MyBookingsComponent
  ],
  imports: [
    CommonModule,
    MyBookingsRoutingModule,
    SharedModule
  ]
})
export class MyBookingsModule { }
