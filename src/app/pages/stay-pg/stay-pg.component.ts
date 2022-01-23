import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { SharedService } from 'src/app/services/helper/shared.service';
import { PgService } from 'src/app/services/pg.service';
import { CustomSnackBarService } from '../../services/helper/custom-snack-bar.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './stay-pg-components/filter-dialog/filter-dialog/filter-dialog.component';
import { SortDialogComponent } from './stay-pg-components/filter-dialog/sort-dialog/sort-dialog.component';
import * as _ from 'lodash';
import { NgxUiLoaderService } from 'ngx-ui-loader';

export interface PG {
  pgId: number,
  pgName: string,
  locationName: string,
  gender: string,
  distance: number,
  pgImage: string,
  pgImageName: string,
  monthlyPrice: boolean,
  weeklyPrice: boolean,
  dailyPrice: boolean,
  pgPrice: number
}

@Component({
  selector: 'app-stay-pg',
  templateUrl: './stay-pg.component.html',
  styleUrls: ['./stay-pg.component.css']
})
export class StayPgComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  fav: boolean = true;
  _sanitizer: any;

  // pgArray = [
  //   {heading:"Sri Sai Balaji PG for Men's", location:'Sector-6, HSR Layout', gender:'both', distance:'22km', reviews:'4.5', pgImg:'../../../assets/imgs/stay/pg.jpg',price:'5000'},
  //   {heading:"Sri Sai Balaji PG for Men's", location:'Sector-6, HSR Layout', gender:'both', distance:'22km', reviews:'4.5', pgImg:'../../../assets/imgs/stay/pg.jpg',price:'5000'},
  //   {heading:"Sri Sai Balaji PG for Men's", location:'Sector-6, HSR Layout', gender:'both', distance:'22km', reviews:'4.5', pgImg:'../../../assets/imgs/stay/pg.jpg',price:'5000'},
  //   {heading:"Sri Sai Balaji PG for Men's", location:'Sector-6, HSR Layout', gender:'both', distance:'22km', reviews:'4.5', pgImg:'../../../assets/imgs/stay/pg.jpg',price:'5000'},
  //   {heading:"Sri Sai Balaji PG for Men's", location:'Sector-6, HSR Layout', gender:'both', distance:'22km', reviews:'4.5', pgImg:'../../../assets/imgs/stay/pg.jpg',price:'5000'},
  //   {heading:"Sri Sai Balaji PG for Men's", location:'Sector-6, HSR Layout', gender:'both', distance:'22km', reviews:'4.5', pgImg:'../../../assets/imgs/stay/pg.jpg',price:'5000'},
  //   {heading:"Sri Sai Balaji PG for Men's", location:'Sector-6, HSR Layout', gender:'both', distance:'22km', reviews:'4.5', pgImg:'../../../assets/imgs/stay/pg.jpg',price:'5000'}
  // ];

  pgArray: PG[] = [];
  pgData: PG[] = [];
  filteringData: any = {
    occupeny: '',
    min_price: '',
    max_price: '',
    gender: '',
    review: '',
    for: ''
  }

  occupencyArray: any = [
    { id: 'occ1', name: 'Single', checkedStatus: false },
    { id: 'occ2', name: 'Double', checkedStatus: false },
    { id: 'occ3', name: 'Triple', checkedStatus: false }
  ]

  budgetArray: any = [
    { id: 'bg1', name: 'Rs. 4500 to Rs. 6500', min_price: 4500, max_price: 6500, checkedStatus: false },
    { id: 'bg2', name: 'Rs. 6500 to Rs. 8500', min_price: 6500, max_price: 8500, checkedStatus: false },
    { id: 'bg3', name: 'Rs. 8500 to Rs. 10500', min_price: 8500, max_price: 10500, checkedStatus: false },
    { id: 'bg4', name: 'Rs. 10500 to Rs. 12500', min_price: 10500, max_price: 12500, checkedStatus: false },
    { id: 'bg5', name: 'Rs. 12500 to Rs. 14500', min_price: 12500, max_price: 14500, checkedStatus: false },
  ]

  genderArray: any = [
    { id: 'gd1', name: 'Male', value: 'male', checkedStatus: false },
    { id: 'gd2', name: 'Female', value: 'female', checkedStatus: false },
    { id: 'gd3', name: 'Both', value: 'both', checkedStatus: false }
  ]

  ratingArray: any = [
    { id: 'rt5', name: 'Five Star', checkedStatus: false, numberOfStar: 5 },
    { id: 'rt4', name: 'Four Star', checkedStatus: false, numberOfStar: 4 },
    { id: 'rt3', name: 'Triple Star', checkedStatus: false, numberOfStar: 3 },
    { id: 'rt2', name: 'Double Star', checkedStatus: false, numberOfStar: 2 },
    { id: 'rt1', name: 'Single Star', checkedStatus: false, numberOfStar: 1 },
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  currentLocation: any;

  constructor(private breakpointObserver: BreakpointObserver, private _shared: SharedService, private _pgService: PgService, private _snackBarService: CustomSnackBarService, private _path: ActivatedRoute, private sanitizer: DomSanitizer, private dialog: MatDialog, private loader: NgxUiLoaderService) {
    this._sanitizer = sanitizer;
  }

  ngOnInit(): void {
    var self = this;
    if(self._shared.sharedData){
      if(self._shared.sharedData.filter==true){
        this.filteringData=self._shared.sharedData;
        self.filterData();
      }
    }
    if (self._shared.sharedData.locationId) {
      let data: any = self._shared.sharedData;
      let locationId = data.locationId;
      let locationName = data.location;
      this.currentLocation = data.location;
      if (locationId && locationId != 0 && locationName && locationName != '') {
        this.loadPGData(data);
      }
    } else {
      if (location.href.includes("All")) {
        let cityId = this._path.snapshot.params.cityId;
        this.loadAllPGDataInCity(cityId);
      } else {
        let data: any = {};
        data.locationId = this._path.snapshot.params.locationId;
        data.locationName = this._path.snapshot.params.locationName;
        this.currentLocation = this._path.snapshot.params.locationName;
        this.loadPGData(data);
      }
    }
  }
  public loadAllPGDataInCity(cityId) {
    this._pgService.loadAllPGDataInCity(cityId).subscribe((response: any) => {
      if (response.error && response.error != '') {
        this._snackBarService.successSnackBar("Something went wrong!");
        return;
      }
      else {
        let totalPg = response.total;
        if (totalPg > 0) {
          let fetchStatus = response.success;
          if (fetchStatus == 'success') {
            let responseData: any = response.data;
            if (responseData) {
              responseData.forEach(element => {
                let pgData = element;
                let data: any = {};
                data.pgId = pgData.pgId;
                data.pgName = pgData.pgName;
                data.locationName = pgData.subLocation.location.locationName;
                data.gender = pgData.pgGender;
                data.distance = pgData.distFromSubLoc;
                data.weekly = pgData.weekly;
                data.monthly = pgData.monthly;
                data.daily = pgData.daily;
                data.singleMemPgPrc = pgData.singleMemPgPrc;
                data.doubleMemPgPrc = pgData.doubleMemPgPrc;
                data.tripleMemPgPrc = pgData.tripleMemPgPrc;
                data.price = (pgData.singleMemPgPrc && pgData.singleMemPgPrc != 0) ? pgData.singleMemPgPrc : (pgData.doubleMemPgPrc && pgData.doubleMemPgPrc != 0) ? pgData.doubleMemPgPrc : pgData.tripleMemPgPrc;
                data.pgImage = pgData.pgImage;
                data.pgImageName = pgData.pgImageName;
                this.pgArray.push(data);
                this.pgData.push(data);
              });
            }

          }
          else {
            this._snackBarService.errorSnackBar("No Record Found!")
          }
        }
        else {
          this._snackBarService.errorSnackBar("No Record Found!");
        }
      }
    },
      (error) => {
        this._snackBarService.errorSnackBar("Something went wrong!");
      });
  }

  private loadPGData(obj: any) {
    var self = this;
    self._pgService.getPGDataWithFilter(obj).subscribe((response: any) => {
      if (response.error && response.error != '') {
        this._snackBarService.errorSnackBar("Something went wrong!");
        return;
      }
      else {
        let fetchStatus = response.success;
        if (fetchStatus == "Fetched") {
          let responseData: any = response.data;
          if (responseData) {
            responseData.forEach(element => {
              let pgData = element;
              let data: any = {};
              data.pgId = pgData.pgId;
              data.pgName = pgData.pgName;
              data.locationName = pgData.subLocation.location.locationName;
              data.gender = pgData.pgGender;
              data.distance = pgData.distFromSubLoc;
              data.weekly = pgData.weekly;
              data.monthly = pgData.monthly;
              data.daily = pgData.daily;
              data.singleMemPgPrc = pgData.singleMemPgPrc;
              data.doubleMemPgPrc = pgData.doubleMemPgPrc;
              data.tripleMemPgPrc = pgData.tripleMemPgPrc;
              data.price = (pgData.singleMemPgPrc && pgData.singleMemPgPrc != 0) ? pgData.singleMemPgPrc : (pgData.doubleMemPgPrc && pgData.doubleMemPgPrc != 0) ? pgData.doubleMemPgPrc : pgData.tripleMemPgPrc;
              // if(pgData.singleMemPgPrc && pgData.singleMemPgPrc!=0){
              //   data.price=pgData.singleMemPgPrc;
              // }
              // else if(pgData.doubleMemPgPrc && pgData.doubleMemPgPrc!=0){
              //   data.price=pgData.doubleMemPgPrc;
              // }
              // else{
              //   data.price=pgData.tripleMemPgPrc;
              // }
              data.pgImage = pgData.pgImage;
              data.pgImageName = pgData.pgImageName;
              this.pgArray.push(data);
              this.pgData.push(data);
            });
          }
        }
        else {
          this._snackBarService.errorSnackBar("Something went wrong!");
          return;
        }
      }
    }, (error: any) => {
      this._snackBarService.errorSnackBar("Something went wrong!");
      return;
    })
  }

  public toggleFav() {
    var self = this;
    self.fav = self.fav ? false : true;
  }

  setOccupancyfilter(id, name) {
    this.occupencyArray.forEach(element => {
      if (element.id == id && element.name == name) {
        let button: any = document.getElementById('' + id);
        if (button.checked == true) {
          this.filteringData.occupeny = name;
          element.checkedStatus = true;
          this.filterData();
        }
        else{
          this.filteringData.occupeny='';
          element.checkedStatus=false;
          this.filterData();
        }
      } else {
        element.checkedStatus = false;
      }
    });
  }
  setBudgetfilter(id, name) {
    this.budgetArray.forEach(element => {
      if (element.id == id && element.name == name) {
        let button: any = document.getElementById('' + id);
        if(button.checked==true){
          this.filteringData.min_price = element.min_price;
          this.filteringData.max_price = element.max_price;
          element.checkedStatus = true;
          this.filterData()
        }
        else{
          this.filteringData.min_price = '';
          this.filteringData.max_price = '';
          element.checkedStatus = false;
          this.filterData()
        }
      } else {
        element.checkedStatus = false;
      }
    });
  }
  setGenderFilter(id, name) {
    this.genderArray.forEach(element => {
      if (element.id == id && element.name == name) {
        let button: any = document.getElementById('' + id);
        if(button.checked==true){
          this.filteringData.gender = element.value;
          element.checkedStatus = true;
          this.filterData();
        }
        else{
          this.filteringData.gender = '';
          element.checkedStatus = false;
          this.filterData();
        }
      } else {
        element.checkedStatus = false;
      }
    });
  }

  setRatingFilter(id, name) {
    this.ratingArray.forEach(element => {
      if (element.id == id && element.name == name) {
        this.filteringData.rating = name;
        element.checkedStatus = true;
      } else {
        element.checkedStatus = false;
      }
    });
  }
  openFilterDialog() {
    this.dialog.open(FilterDialogComponent, {
      height: "515px",
      width: "400px",
      disableClose: true
    });
  }
  openSortDialog() {
    this.dialog.open(SortDialogComponent, {
      height: "300px",
      width: "400px",
      disableClose: true
    });
  }
  clearOccupancyFilter() {
    let self = this;
    self.occupencyArray.forEach((item) => {
      item.checkedStatus = false;
    });
    self.filteringData.occupeny = '';
    self.filterData();
  }
  clearBudgetFilter() {
    let self = this;
    self.budgetArray.forEach((item) => {
      item.checkedStatus = false;
    });
    self.filteringData.min_price = '';
    self.filteringData.max_price = '';
    self.filterData();
  }
  cleanGenderFilter() {
    let self = this;
    self.genderArray.forEach((item) => {
      item.checkedStatus = false;
    });
    self.filteringData.gender = '';
    self.filterData();
  }
  clickRatingFilter() {
    let self = this;
    self.ratingArray.forEach((item) => {
      item.checkedStatus = false;
    });
    self.filteringData.rating = '';
  }
  filterData() {
    let self = this;
    self.loader.start();
    if(self.filteringData.for=='city'){

    }
    if(self.filteringData.for=='location'){

    };
    self.pgArray = JSON.parse(JSON.stringify(self.pgData));
    if (self.filteringData.occupeny && self.filteringData.occupeny != '') {
      if (self.filteringData.occupeny == 'Single') {
        _.remove(self.pgArray, (item: any) => {
          return item.singleMemPgPrc == 0;
        });
      }
      else if (self.filteringData.occupeny == 'Double') {
        _.remove(self.pgArray, (item: any) => {
          return item.doubleMemPgPrc == 0;
        });
      }
      else if (self.filteringData.occupeny == 'Triple') {
        _.remove(self.pgArray, (item: any) => {
          return item.tripleMemPgPrc == 0;
        });
      }
    }
    if (self.filteringData.min_price && self.filteringData.min_price != '' && self.filteringData.max_price && self.filteringData != '') {
      let min_price = Number(self.filteringData.min_price);
      let max_price = Number(self.filteringData.max_price);
      _.remove(self.pgArray, (item: any) => {
        return item.price < min_price || item.price > max_price;
      });
    }
    if (self.filteringData.gender && self.filteringData.gender != '') {
      _.remove(self.pgArray, (item: any) => {
        return item.gender != this.filteringData.gender;
      });
    }
    self.loader.stop();
  }
}
