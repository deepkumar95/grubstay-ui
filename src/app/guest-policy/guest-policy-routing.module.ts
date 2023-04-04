import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestPolicyComponent } from './guest-policy.component';

const routes: Routes = [{ path: '', component: GuestPolicyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestPolicyRoutingModule { }
