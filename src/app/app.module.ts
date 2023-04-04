import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';

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
import {MatTreeModule} from '@angular/material/tree';
import { PgTreeComponent } from './pages/admin-dashboard/admin-components/pg-tree/pg-tree.component';
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
import { PgOperationComponent } from './pages/admin-dashboard/admin-components/pg-operation/pg-operation.component';
import { PgOpDialogComponent } from './pages/admin-dashboard/admin-components/pg-operation/pg-op-dialog/pg-op-dialog.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxUiLoaderModule, NgxUiLoaderConfig,NgxUiLoaderRouterModule} from "ngx-ui-loader";
import { PgGalleryDialogComponent } from './pages/admin-dashboard/admin-components/pg-operation/pg-gallery-dialog/pg-gallery-dialog.component';
import {MatNativeDateModule} from '@angular/material/core';
import { SubadminTreeComponent } from './pages/admin-dashboard/admin-components/subadmin-tree/subadmin-tree.component';
import { SubAdminComponent } from './pages/admin-dashboard/admin-components/sub-admin/sub-admin.component';
import { TraverlNearByComponent } from './pages/admin-dashboard/admin-components/traverl-near-by/traverl-near-by.component';
import { TravelNearByDialogComponent } from './pages/admin-dashboard/admin-components/traverl-near-by/travel-near-by-components/travel-near-by-dialog/travel-near-by-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import { AdminDialogComponent } from './pages/admin-dashboard/admin-components/sub-admin/admin-dialog/admin-dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import { CallbackComponent } from './pages/admin-dashboard/admin-components/callback/callback.component';
import {MatTabsModule} from '@angular/material/tabs';
import { StayFormComponent } from './components/stay-form/stay-form.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ViewFormEquiriesComponent } from './pages/admin-dashboard/admin-components/view-form-equiries/view-form-equiries.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter';
import { SharedModule } from './shared/shared.module';
import { BookingComponent } from './pages/admin-dashboard/admin-components/booking-components/booking.component';
import { FaqsComponent } from './faqs/faqs.component';
import { CareersComponent } from './careers/careers.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

const ngxUiLoaderConfig:NgxUiLoaderConfig =
  {
    "bgsColor": "rgb(187, 6, 66)",
    "bgsOpacity": 0.5,
    "bgsPosition": "bottom-right",
    "bgsSize": 60,
    "bgsType": "ball-spin-clockwise",
    "blur": 5,
    "delay": 0,
    "fastFadeOut": true,
    "fgsColor": "rgb(187, 6, 66)",
    "fgsPosition": "center-center",
    "fgsSize": 60,
    "fgsType": "ball-spin-clockwise",
    "gap": 24,
    "logoPosition": "center-center",
    "logoSize": 120,
    "logoUrl": "",
    "masterLoaderId": "master",
    "overlayBorderRadius": "0",
    "overlayColor": "rgba(40, 40, 40, 0.8)",
    "pbColor": "rgb(187, 6, 66)",
    "pbDirection": "ltr",
    "pbThickness": 3,
    "hasProgressBar": true,
    "text": "Please Wait",
    "textColor": "white",
    "textPosition": "center-center",
    "maxTime": -1,
    "minTime": 300
  }

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
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
    PgTreeComponent,
    LocationTreeComponent,
    CityComponent,
    LocationComponent,
    SublocationComponent,
    CityDialogComponent,
    LocationDialogComponent,
    TextUpperCaseDirective,
    SublocationDialogComponent,
    PgOperationComponent,
    PgOpDialogComponent,
    PgGalleryDialogComponent,
    SubadminTreeComponent,
    SubAdminComponent,
    TraverlNearByComponent,
    TravelNearByDialogComponent,
    AdminDialogComponent,
    CallbackComponent,
    StayFormComponent,
    ViewFormEquiriesComponent,
    BookingComponent,
    FaqsComponent,
    CareersComponent,
    TermsConditionsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
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
    MatProgressSpinnerModule,
    MatRadioModule,
    MatCheckboxModule,
    NgxUiLoaderModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    MatNativeDateModule,
    MatMenuModule,
    MatTooltipModule,
    MatExpansionModule,
    MatTabsModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableExporterModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
