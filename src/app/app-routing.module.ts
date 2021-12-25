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
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
