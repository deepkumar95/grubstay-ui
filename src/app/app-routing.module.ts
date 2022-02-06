import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from './pages/admin-dashboard/admin-components/admin-main/admin-main.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { PgComponent } from './pages/pg/pg.component';
import { SearchStayComponent } from './pages/search-stay/search-stay.component';
import { StayPgComponent } from './pages/stay-pg/stay-pg.component';
import { LocationComponent } from './pages/admin-dashboard/admin-components/location/location.component';
import { CityComponent } from './pages/admin-dashboard/admin-components/city/city.component';
import { SublocationComponent } from './pages/admin-dashboard/admin-components/sublocation/sublocation.component';
import { PgOperationComponent } from './pages/admin-dashboard/admin-components/pg-operation/pg-operation.component';
import { SubAdminComponent } from './pages/admin-dashboard/admin-components/sub-admin/sub-admin.component';
import { TraverlNearByComponent } from './pages/admin-dashboard/admin-components/traverl-near-by/traverl-near-by.component';
import { AdminGuard } from './admin.guard';
import { CallbackComponent } from './pages/admin-dashboard/admin-components/callback/callback.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"pg/:cityName",
    component:StayPgComponent
  },
  {
    path:"pg/:cityName/:locationName",
    component:StayPgComponent
  },
  {
    path:"pg/:cityName/:locationName/:subLocationName",
    component:StayPgComponent
  },
  {
    path:"pg/:cityName/:locationName/:subLocationName/:pgName",
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
    canActivate:[AdminGuard],
    children:[
      {
        path:'',
        component:AdminMainComponent
      },
      {
        path:'callback',
        component:CallbackComponent
      },
      {
        path:'pg',
        component:PgOperationComponent
      },
      {
        path:'view-pg',
        component:PgOperationComponent
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
      },
      {
        path:'sub-admin',
        component:SubAdminComponent
      },
      {
        path:'traverl-nearby',
        component:TraverlNearByComponent 
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
