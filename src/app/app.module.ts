import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {LayoutModule} from '@angular/cdk/layout';
import {MatListModule} from '@angular/material/list';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SignupDialogComponent } from './components/signup-dialog/signup-dialog.component';
import { LocationCarouselComponent } from './components/location-carousel/location-carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatCardModule} from '@angular/material/card';
import { StayCarouselComponent } from './components/stay-carousel/stay-carousel.component';
import { TravelNearbyComponent } from './components/travel-nearby/travel-nearby.component';
import { StayPgComponent } from './pages/stay-pg/stay-pg.component';
import {MatDividerModule} from '@angular/material/divider';
import { SearchStayComponent } from './pages/search-stay/search-stay.component';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import { PgComponent } from './pages/pg/pg.component';
import { SearchDialogComponent } from './components/search-dialog/search-dialog.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './pages/admin-dashboard/admin-components/admin-sidebar/admin-sidebar.component';
import { AdminMainComponent } from './pages/admin-dashboard/admin-components/admin-main/admin-main.component';
import { AddPgComponent } from './pages/admin-dashboard/admin-components/add-pg/add-pg.component';
import {MatTreeModule} from '@angular/material/tree';
import { PgTreeComponent } from './pages/admin-dashboard/admin-components/pg-tree/pg-tree.component';
import { ViewPgComponent } from './pages/admin-dashboard/admin-components/view-pg/view-pg.component';
import { LocationTreeComponent } from './pages/admin-dashboard/admin-components/location-tree/location-tree.component';
import { CityComponent } from './pages/admin-dashboard/admin-components/city/city.component';
import { LocationComponent } from './pages/admin-dashboard/admin-components/location/location.component';
import { SublocationComponent } from './pages/admin-dashboard/admin-components/sublocation/sublocation.component';
import {MatTableModule} from '@angular/material/table';
import { CityDialogComponent } from './pages/admin-dashboard/admin-components/city/city-components/city-dialog/city-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { LocationDialogComponent } from './pages/admin-dashboard/admin-components/location/location-components/location-dialog/location-dialog.component';
import { TextUpperCaseDirective } from './text-upper-case.directive';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SublocationDialogComponent } from './pages/admin-dashboard/admin-components/sublocation/sublocation-components/sublocation-dialog/sublocation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginDialogComponent,
    SignupDialogComponent,
    LocationCarouselComponent,
    StayCarouselComponent,
    TravelNearbyComponent,
    StayPgComponent,
    SearchStayComponent,
    PgComponent,
    SearchDialogComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    AdminMainComponent,
    AddPgComponent,
    PgTreeComponent,
    ViewPgComponent,
    LocationTreeComponent,
    CityComponent,
    LocationComponent,
    SublocationComponent,
    CityDialogComponent,
    LocationDialogComponent,
    TextUpperCaseDirective,
    SublocationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    LayoutModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    CarouselModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    HttpClientModule,
    LazyLoadImageModule,
    MatTreeModule,
    MatTableModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
