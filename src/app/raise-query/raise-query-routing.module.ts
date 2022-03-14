import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaiseQueryComponent } from './raise-query.component';

const routes: Routes = [{ path: '', component: RaiseQueryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaiseQueryRoutingModule { }
