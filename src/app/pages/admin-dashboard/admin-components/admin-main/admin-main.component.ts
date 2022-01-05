import { Component, OnInit } from '@angular/core';
import { CityServiceService } from '../../../../services/city-service.service';
import { LocationService } from '../../../../services/location.service';
import { SubLocationService } from '../../../../services/sub-location.service';
import { CustomSnackBarService } from '../../../../services/helper/custom-snack-bar.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  totalCitites = 0;
  totalLocations = 0;
  totalSubLocations = 0;

  constructor(private _cityService: CityServiceService, private _locationService: LocationService, private _subLocationService: SubLocationService, private _snackBarService:CustomSnackBarService) { }

  ngOnInit(): void {
    this.loadAllCity();
    this.loadAllLocation();
    this.loadAllSubLocation();
  }
  loadAllCity() {
    this._cityService.loadAllCity().subscribe(
      (response: any) => {
        if (response.erorr && response.error != '') {
          this._snackBarService.errorSnackBar("Something went wrong!...Please Try Again");
          return;
        } else {
          let responseData:any = response.data;
          if (responseData) {
            this.totalCitites=responseData.length;
          }
        }
      },
      (error: any) => {
        this._snackBarService.errorSnackBar("Something went wrong!...Please Try Again");
        return;
      });
  }

  loadAllLocation(){

  }

  loadAllSubLocation(){

  }

}
