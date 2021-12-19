import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StayPgComponent } from './pages/stay-pg/stay-pg.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"stay-pg",
    component:StayPgComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
