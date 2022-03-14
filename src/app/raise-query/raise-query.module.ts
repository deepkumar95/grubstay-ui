import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaiseQueryRoutingModule } from './raise-query-routing.module';
import { RaiseQueryComponent } from './raise-query.component';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RaiseQueryComponent
  ],
  imports: [
    CommonModule,
    RaiseQueryRoutingModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    FormsModule
  ]
})
export class RaiseQueryModule { }
