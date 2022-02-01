import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchDialogComponent } from 'src/app/components/search-dialog/search-dialog.component';
import { CityServiceService } from 'src/app/services/city-service.service';
import { CustomSnackBarService } from 'src/app/services/helper/custom-snack-bar.service';
import { SharedService } from 'src/app/services/helper/shared.service';
import { HomeService } from 'src/app/services/home.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  request:any={};
  city:any = [];
  location:any = [];

  panelOpenState = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
  );

  constructor(private breakpointObserver:BreakpointObserver, public dialog:MatDialog,
    private loader:NgxUiLoaderService,private _home:HomeService,
    private _snackbarService:CustomSnackBarService,private _city:CityServiceService,private _shared:SharedService) { }

  ngOnInit(): void {
    this.getCitiesWithLocation();
  }

  public openSearchDialog(){
    const dialogRef = this.dialog.open(SearchDialogComponent,{
      height: '600px',
      width: '500px',
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  requestCall(){
    var self = this;
    if(this.request.phone.toString().length > 10 || this.request.phone.toString().length < 10){
      this._snackbarService.errorSnackBar("invalid phone number...!")
      return;
    }
    if(this.request.phone && this.request.name && this.request.email){
      this.sendRequest(this.request);
    }
  }

  sendRequest(request:any) {
    this.loader.start();
    this._home.sendCallRequest(request).subscribe(
      (response: any) => {
        if (response.erorr && response.error != '') {
          this._snackbarService.errorSnackBar("Call request failed!...Please Try Again");
          this.loader.stop();
          return;
        } else {
          let responseData = response;
          if(responseData.success == 'saved'){
            this._snackbarService.successSnackBar("Call requested successfully..");
            this.request.name = '';
            this.request.email = '';
            this.request.phone = '';
            this.request = {};
          }
          this.loader.stop();
        }
      },
      (error: any) => {
        this._snackbarService.errorSnackBar("Call request failed!...Please Try Again");
        this.loader.stop();
        return;
      });
  }

  getCitiesWithLocation() {
    let self = this;
    this._city.getCitiesWithLocation().subscribe(
      (response: any) => {
        if (response.erorr && response.error != '') {
          return;
        } else {
          let responseData: any = response.data;
          this.location = responseData;
          let tempCity = [];
          responseData.forEach(element => {
            let data:any = {}
            data.city_id = element.city_id;
            data.city_name = element.city_name;
            tempCity.push(data);
          });
          this.city = [...new Map(tempCity.map((item) =>[item["city_id"],item])).values()];
         // this._snackBarService.successSnackBar("Successfully Fetched!");
        }
      },
      (error: any) => {
        return;
      });
  }

  goTo(location:any){
    let cityName = location.city_name.toLowerCase().split(' ').join('-').trim();
    let locationName = location.location_name.toLowerCase().split(' ').join('-').trim();
    let routeTo = '/stay/'+cityName+'/'+locationName;
    this._shared.redirectTo(routeTo);
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

}
