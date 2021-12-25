import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { PgComponent } from './pages/pg/pg.component';
import { SearchStayComponent } from './pages/search-stay/search-stay.component';
import { StayPgComponent } from './pages/stay-pg/stay-pg.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"stay-pg",
    component:StayPgComponent
  },
  {
    path:"pg/:pgId",
    component:PgComponent
  },
  {
    path:"search-stay",
    component:SearchStayComponent,
    pathMatch:'full'
  },
  {
    path:"admin",
    component:AdminDashboardComponent,
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
