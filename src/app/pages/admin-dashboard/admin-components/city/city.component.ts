import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CityDialogComponent } from '../../admin-components/city/city-components/city-dialog/city-dialog.component';
import { CityServiceService } from '../../../../services/city-service.service';
import { CustomSnackBarService } from '../../../../services/helper/custom-snack-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash'; 

export interface City {
  cityId: number;
  cityName: string;
  cityImage: string;
  status: string;
}


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})


export class CityComponent implements OnInit {
  CITY_DATA:City[]=[];
  displayedColumns: string[] = ['actions', 'position', 'cityImage', 'cityName'];
  dataSource = new MatTableDataSource(this.CITY_DATA);

  constructor(private dialog: MatDialog, private _cityService: CityServiceService, private _snackbarService: CustomSnackBarService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadCityData();
  }

  public editItem(cityId) {
    let cityData=_.find(this.CITY_DATA,(item:any)=>{
      return (item.cityId==cityId);
    });
    const dialogRef = this.dialog.open(CityDialogComponent, {
      width: '500px',
      height: '500px',
      data:cityData
    });
    console.log(cityData);
  }

  public deleteItem(position) {
    alert(position + " Clicked");
  }
  openCityDialog() {
    const dialogRef = this.dialog.open(CityDialogComponent, {
      width: '500px',
      height: '500px'
    });
  }

  filterCity(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  loadCityData() {
    this._cityService.loadAllCity().subscribe(
      (response: any) => {
        if (response.erorr && response.error != '') {
          this._snackbarService.errorSnackBar("Something went wrong!...Please Try Again");
          return;
        } else {
          let responseData = response.data;
          if (responseData) {
            this.CITY_DATA = responseData;
            this.dataSource = new MatTableDataSource(this.CITY_DATA);
          }
          this._snackbarService.successSnackBar("Successfully Fetched!");
        }
      },
      (error: any) => {
        this._snackbarService.errorSnackBar("Something went wrong!...Please Try Again");
        return;
      });
  }
}
