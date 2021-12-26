import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPgComponent } from './pages/admin-dashboard/admin-components/add-pg/add-pg.component';
import { AdminMainComponent } from './pages/admin-dashboard/admin-components/admin-main/admin-main.component';
import { ViewPgComponent } from './pages/admin-dashboard/admin-components/view-pg/view-pg.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { PgComponent } from './pages/pg/pg.component';
import { SearchStayComponent } from './pages/search-stay/search-stay.component';
import { StayPgComponent } from './pages/stay-pg/stay-pg.component';
import { LocationComponent } from './pages/admin-dashboard/admin-components/location/location.component';
import { CityComponent } from './pages/admin-dashboard/admin-components/city/city.component';
import { SublocationComponent } from './pages/admin-dashboard/admin-components/sublocation/sublocation.component';

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
    children:[
      {
        path:'',
        component:AdminMainComponent
      },
      {
        path:'add-pg',
        component:AddPgComponent
      },
      {
        path:'view-pg',
        component:ViewPgComponent
      },
      {
        path:'city',
        component:CityComponent
      },
      {
        path:'location',
        component:LocationComponent
      },
      {
        path:'sub-location',
        component:SublocationComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
