import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedService } from 'src/app/services/helper/shared.service';
import { PgService } from 'src/app/services/pg.service';
import { CustomSnackBarService } from '../../services/helper/custom-snack-bar.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenuTrigger } from '@angular/material/menu';

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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  currentLocation: any;

  constructor(private breakpointObserver: BreakpointObserver, private _shared: SharedService, private _pgService: PgService, private _snackBarService: CustomSnackBarService, private _path: ActivatedRoute, private sanitizer: DomSanitizer) {
    this._sanitizer = sanitizer;
  }

  ngOnInit(): void {
    var self = this;
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
        let cityId=this._path.snapshot.params.cityId;
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
  public loadAllPGDataInCity(cityId){
    this._pgService.loadAllPGDataInCity(cityId).subscribe((response:any)=>{
      if(response.error && response.error!=''){
        this._snackBarService.successSnackBar("Something went wrong!");
        return;
      }
      else{
        let totalPg=response.total;
        if(totalPg > 0){
            let fetchStatus=response.success;
            if(fetchStatus=='success'){
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
            });
          }

            }
            else{
              this._snackBarService.errorSnackBar("No Record Found!")
            }
        }
        else{
          this._snackBarService.errorSnackBar("No Record Found!");
        }
      }
    },
    (error)=>{
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

}
