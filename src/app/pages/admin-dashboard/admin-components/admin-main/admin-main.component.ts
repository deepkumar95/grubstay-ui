import { Component, OnInit } from '@angular/core';
import { CustomSnackBarService } from '../../../../services/helper/custom-snack-bar.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  totalCitites = 0;
  totalLocations = 0;
  totalSubLocations = 0;
  totalPg = 0;
  totalMalePg = 0;
  totalFemalePg = 0;

  constructor(private _home:HomeService, private _snackBarService:CustomSnackBarService) { }

  ngOnInit(): void {
    this.loadAllCounts();
  }
  loadAllCounts() {
    this._home.loadAllCounts().subscribe(
      (response: any) => {
        if (response.erorr && response.error != '') {
          this._snackBarService.errorSnackBar("Something went wrong!...Please Try Again");
          return;
        } else {
          let responseData:any = response.data[0];
          if (responseData) {
            this.totalCitites = responseData.citiesCount;
            this.totalLocations = responseData.locationsCount;
            this.totalSubLocations = responseData.subLocationsCount;
            this.totalPg = responseData.pgCounts;
            this.totalMalePg = responseData.pgMaleCounts;
            this.totalFemalePg = responseData.pgFemaleCounts;
          }
        }
      },
      (error: any) => {
        this._snackBarService.errorSnackBar("Something went wrong!...Please Try Again");
        return;
      });
  }

}
