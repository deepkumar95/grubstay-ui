import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { SharedService } from 'src/app/services/helper/shared.service';
import { PgService } from 'src/app/services/pg.service';
import { CustomSnackBarService } from '../../services/helper/custom-snack-bar.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
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
  stayTitle:any="";
  stayType:any = "";

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
  ready = '';
  filteringData: any = {
    occupeny: '',
    min_price: '',
    max_price: '',
    gender: '',
    review: '',
    for: '',
    cityId: '',
    locationId: '',
    locationName: '',
    sorting:''
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
  
  sortingArray:any = [
    { id: 'st1', name: 'High to Low', value: 'desc', checkedStatus: false },
    { id: 'st2', name: 'Low to High', value: 'asc', checkedStatus: false },
  ]

  loaderStatus:boolean = false;
  tempList = [1,1,1,1,1,1,1]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  currentLocation: any;

  constructor(private breakpointObserver: BreakpointObserver, private _shared: SharedService, private _pgService: PgService, private _snackBarService: CustomSnackBarService, private _path: ActivatedRoute, private sanitizer: DomSanitizer, private dialog: MatDialog, private loader: NgxUiLoaderService,private title:Title) {
    this._sanitizer = sanitizer;
  }

  ngOnInit(): void {
    var self = this;
    // if (self._shared.sharedData.locationId) {
    //   let data: any = self._shared.sharedData;
    //   let locationId = data.locationId;
    //   let locationName = data.location;
    //   this.currentLocation = data.location;
    //   if (locationId && locationId != 0 && locationName && locationName != '') {
    //     this.loadPGData(data);
    //   }
    // } else {
    //   if (location.href.includes("All")) {
    //     let cityId = this._path.snapshot.params.cityId;
    //     this.loadAllPGDataInCity(cityId);
    //   } else {
    //     let data: any = {};
    //     data.locationId = this._path.snapshot.params.locationId;
    //     data.locationName = this._path.snapshot.params.locationName;
    //     this.currentLocation = this._path.snapshot.params.locationName;
    //     this.loadPGData(data);
    //   }
    // }
    let urlData:any=this._path.snapshot.params;
    let cityName=urlData.cityName;
    let locationName=urlData.locationName;
    let subLocationName=urlData.subLocationName;
    this.stayType = this._path.snapshot.url[0].path.toUpperCase();
    if(cityName && locationName && subLocationName){
      cityName=urlData.cityName.split("-").join(" ").trim().toUpperCase();
      locationName=urlData.locationName.split("-").join(" ").trim().toUpperCase();
      subLocationName=urlData.subLocationName.split("-").join(" ").trim().toUpperCase();
      this.stayTitle = subLocationName;
      let data:any = {
        cityName : cityName,
        locationName : locationName,
        subLocationName : subLocationName
      }
      this.getPgUsingSubLocationLocationAndCity(data);
    }
    else if(cityName && locationName){
      let filterData:any={};
      cityName=urlData.cityName.split("-").join(" ").trim().toUpperCase();
      locationName=urlData.locationName.split("-").join(" ").trim().toUpperCase();
      filterData.locationName = locationName;
      filterData.locationId = 0;
      filterData.stayType = '';
      filterData.gender = '';
      filterData.nearby = '';
      filterData.stayPlan = '';
      filterData.cityName = cityName;
      this.stayTitle = locationName;
      this.loadPGData(filterData);
    }
    else if(cityName){
      cityName=urlData.cityName.split("-").join(" ").trim().toUpperCase();
      this.stayTitle = cityName;
      this.loadAllPGDataInCity(cityName);
    }
    else{
      this._shared.redirectTo('');
    }
    this.setTitle('PG in '+this.covertToCamelCase(this.stayTitle));
  }
  public loadAllPGDataInCity(cityName) {
    this.loaderStatus = true;
    this._pgService.loadAllPGDataInCity(cityName).subscribe((response: any) => {
      if (response.error && response.error != '') {
        this._snackBarService.successSnackBar("Something went wrong!");
        this.loaderStatus = false;
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
                data.pgName = pgData.pgName
                data.urlPgName = pgData.pgName.split(' ').join('-').trim().toLowerCase();
                data.subLocationName=pgData.subLocation.subLocationName.split(' ').join('-').trim().toLowerCase();
                data.cityName=cityName.split(' ').join('-').trim().toLowerCase();
                data.locationName = pgData.subLocation.location.locationName.split(' ').join('-').trim().toLowerCase();
                data.gender = pgData.pgGender;
                data.distance = pgData.distFromSubLoc;
                data.weekly = pgData.weekly;
                data.monthly = pgData.monthly;
                data.daily = pgData.daily;
                data.singleMemPgPrc = pgData.singleMemPgPrc;
                data.doubleMemPgPrc = pgData.doubleMemPgPrc;
                data.tripleMemPgPrc = pgData.tripleMemPgPrc;
                data.fourMemPgPrc = pgData.fourMemPgPrc;
                data.price = (pgData.fourMemPgPrc && pgData.fourMemPgPrc != 0) ? pgData.fourMemPgPrc : (pgData.tripleMemPgPrc && pgData.tripleMemPgPrc != 0) ? pgData.tripleMemPgPrc : (pgData.doubleMemPgPrc && pgData.doubleMemPgPrc != 0) ? pgData.doubleMemPgPrc : pgData.singleMemPgPrc;
                data.pgImage = pgData.pgImage;
                data.pgImageName = pgData.pgImageName ;
                this.pgArray.push(data);
                this.pgData.push(data);
              });
              this.ready = responseData.length > 0 ? 'hide' : 'show';
            }

          }
          else {
            //this._snackBarService.errorSnackBar("No Record Found!")
            this.ready = totalPg > 0 ? 'hide' : 'show';
          }
          this.loaderStatus = false;
        }
        else {
          //this._snackBarService.errorSnackBar("No Record Found!");
          this.ready = totalPg > 0 ? 'hide' : 'show';
          this.loaderStatus = false;
        } 
      }
    },
      (error) => {
        this._snackBarService.errorSnackBar("Something went wrong!");
        this.loaderStatus = false;
      });
  }

  private loadPGData(obj: any) {
    var self = this;
    this.loaderStatus = true;
    self._pgService.getPGDataWithFilter(obj).subscribe((response: any) => {
      if (response.error && response.error != '') {
        this._snackBarService.errorSnackBar("Something went wrong!");
        this.loaderStatus = false;
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
              data.urlPgName = pgData.pgName.split(' ').join('-').trim().toLowerCase();
              data.subLocationName=pgData.subLocation.subLocationName.split(' ').join('-').trim().toLowerCase();
              data.cityName=obj.cityName.split(' ').join('-').trim().toLowerCase();
              data.locationName = pgData.subLocation.location.locationName.split(' ').join('-').trim().toLowerCase();
              data.gender = pgData.pgGender;
              data.distance = pgData.distFromSubLoc;
              data.weekly = pgData.weekly;
              data.monthly = pgData.monthly;
              data.daily = pgData.daily;
              data.singleMemPgPrc = pgData.singleMemPgPrc;
              data.doubleMemPgPrc = pgData.doubleMemPgPrc;
              data.tripleMemPgPrc = pgData.tripleMemPgPrc;
              data.fourMemPgPrc = pgData.fourMemPgPrc;
              data.price = (pgData.fourMemPgPrc && pgData.fourMemPgPrc != 0) ? pgData.fourMemPgPrc : (pgData.tripleMemPgPrc && pgData.tripleMemPgPrc != 0) ? pgData.tripleMemPgPrc : (pgData.doubleMemPgPrc && pgData.doubleMemPgPrc != 0) ? pgData.doubleMemPgPrc : pgData.singleMemPgPrc;
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
            this.ready = responseData.length > 0 ? 'hide' : 'show';
            this.loaderStatus = false;
          }
          this.loaderStatus = false;
        }
        else {
          this._snackBarService.errorSnackBar("Something went wrong!");
          this.loaderStatus = false;
          return;
        }
      }
    }, (error: any) => {
      this._snackBarService.errorSnackBar("Something went wrong!");
      this.loaderStatus = false;
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
        else {
          this.filteringData.occupeny = '';
          element.checkedStatus = false;
          this.filterData();
        }
      } else {
        element.checkedStatus = false;
      }
    });
  }
  setSortingfilter(id, name) {
    this.sortingArray.forEach(element => {
      if (element.id == id && element.name == name) {
        let button: any = document.getElementById('' + id);
        if (button.checked == true) {
          this.filteringData.sorting = element.value;
          element.checkedStatus = true;
          this.filterData();
        }
        else {
          this.filteringData.sorting = '';
          element.checkedStatus = false;
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
        if (button.checked == true) {
          this.filteringData.min_price = element.min_price;
          this.filteringData.max_price = element.max_price;
          element.checkedStatus = true;
          this.filterData()
        }
        else {
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
        if (button.checked == true) {
          this.filteringData.gender = element.value;
          element.checkedStatus = true;
          this.filterData();
        }
        else {
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
  clearOccupancyFilter() {
    let self = this;
    self.occupencyArray.forEach((item) => {
      item.checkedStatus = false;
    });
    self.filteringData.occupeny = '';
    self.filterData();
  }
  clearSortingFilter() {
    let self = this;
    self.sortingArray.forEach((item) => {
      item.checkedStatus = false;
    });
    self.filteringData.sorting = '';
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
  filterDataforMobile(){
    let self=this;
    if (self.filteringData.for == 'city') {
      let cityId=this.filteringData.cityId;
      self.pgArray=[];
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
                  data.fourMemPgPrc = pgData.fourMemPgPrc;
                  data.price = (pgData.fourMemPgPrc && pgData.fourMemPgPrc != 0) ? pgData.fourMemPgPrc : (pgData.tripleMemPgPrc && pgData.tripleMemPgPrc != 0) ? pgData.tripleMemPgPrc : (pgData.doubleMemPgPrc && pgData.doubleMemPgPrc != 0) ? pgData.doubleMemPgPrc : pgData.singleMemPgPrc;
                  data.pgImage = pgData.pgImage;
                  data.pgImageName = pgData.pgImageName;
                  this.pgArray.push(data);
                  this.pgData.push(data);
                });
                this.ready = responseData.length > 0 ? 'hide' : 'show';
                self.filterData();
              }

            }
            else {
              //this._snackBarService.errorSnackBar("No Record Found!")
              this.ready = totalPg > 0 ? 'hide' : 'show';
            }
          }
          else {
            //this._snackBarService.errorSnackBar("No Record Found!");
            this.ready = totalPg > 0 ? 'hide' : 'show';
          }
        }
      },
        (error) => {
          this._snackBarService.errorSnackBar("Something went wrong!");
        });
    }
    if (self.filteringData.for == 'location') {
      let data: any = {};
      data.locationId = this.filteringData.locationId;
      data.locationName = this.filteringData.locationName;
      this.currentLocation = this.filteringData.locationName;
      this.loadPGData(data);
    };
  }
  filterData() {
    let self = this;
    self.loader.start();
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
    if(self.filteringData.sorting && self.filteringData.sorting!=''){
      if(self.filteringData.sorting=='asc'){
        this.sortArrayInAscendingOrder(self.pgArray);
      }
      if(self.filteringData.sorting=='desc'){
        this.sortArrayInDescendingOrder(self.pgArray);
      }
    }
    self.ready = self.pgArray.length > 0 ? 'hide' : 'show';
    self.loader.stop();
  }
  sortArrayInAscendingOrder(pgArray:any){
    pgArray.sort((a:any, b:any)=>{
      if(a.price > b.price)
        return 1;
      if(a.price < b.price)
        return -1;
      if(a.price == b.price)
        return 0;
    })
    console.log("Ascending Order");
    console.log(pgArray);
  }
  sortArrayInDescendingOrder(pgArray:any){
    pgArray.sort((a:any, b:any)=>{
      if(a.price < b.price)
        return 1;
      if(a.price > b.price)
        return -1;
      if(a.price == b.price)
        return 0;
    })
  }

  public covertToCamelCase(letters:string) {
    const str = letters.toLowerCase();
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  
    }
    const str2 = arr.join(" ");
    return str2;
  }

  public getPgUsingSubLocationLocationAndCity(datas:any){
    this.loaderStatus = true;
    this._pgService.getPgUsingSubLocationLocationAndCity(datas).subscribe((response: any) => {
      if (response.error && response.error != '') {
        this._snackBarService.successSnackBar("Something went wrong!");
        this.loaderStatus = false;
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
                data.pgName = pgData.pgName
                data.urlPgName = pgData.pgName.split(' ').join('-').trim().toLowerCase();
                data.subLocationName=pgData.subLocation.subLocationName.split(' ').join('-').trim().toLowerCase();
                data.cityName=pgData.subLocation.location.city.cityName.split(' ').join('-').trim().toLowerCase();
                data.locationName = pgData.subLocation.location.locationName.split(' ').join('-').trim().toLowerCase();
                data.gender = pgData.pgGender;
                data.distance = pgData.distFromSubLoc;
                data.weekly = pgData.weekly;
                data.monthly = pgData.monthly;
                data.daily = pgData.daily;
                data.singleMemPgPrc = pgData.singleMemPgPrc;
                data.doubleMemPgPrc = pgData.doubleMemPgPrc;
                data.tripleMemPgPrc = pgData.tripleMemPgPrc;
                data.fourMemPgPrc = pgData.fourMemPgPrc;
                data.price = (pgData.fourMemPgPrc && pgData.fourMemPgPrc != 0) ? pgData.fourMemPgPrc : (pgData.tripleMemPgPrc && pgData.tripleMemPgPrc != 0) ? pgData.tripleMemPgPrc : (pgData.doubleMemPgPrc && pgData.doubleMemPgPrc != 0) ? pgData.doubleMemPgPrc : pgData.singleMemPgPrc;
                data.pgImage = pgData.pgImage;
                data.pgImageName = pgData.pgImageName;
                this.pgArray.push(data);
                this.pgData.push(data);
              });
              this.ready = responseData.length > 0 ? 'hide' : 'show';
              this.loaderStatus = false;
            }

          }
          else {
            //this._snackBarService.successSnackBar("No Record Found!")
            this.ready = totalPg > 0 ? 'hide' : 'show';
            this.loaderStatus = false;
          }
          this.loaderStatus = false;
        }
        else {
          //this._snackBarService.errorSnackBar("No Record Found!");
          this.ready = totalPg > 0 ? 'hide' : 'show';
          this.loaderStatus = false;
        } 
      }
    },
      (error) => {
        this._snackBarService.errorSnackBar("Something went wrong!");
        this.loaderStatus = false;
      });
  }

  public setTitle(title:string){
    this.title.setTitle(title);
  }
}
