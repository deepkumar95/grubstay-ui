import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { LocationDialogComponent } from './location-components/location-dialog/location-dialog.component';
import { LocationService } from '../../../../services/location.service';
import { CustomSnackBarService } from '../../../../services/helper/custom-snack-bar.service';
import * as _ from 'lodash'; 

export interface Location {
  locationId:number;
  locationName:string;
  cityId:number;
  cityName: string;
  operation:string;
  status:string;
  service:string;
  selected:string;
}


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})


export class LocationComponent implements OnInit {
  LOCATION_DATA:Location[] = [];
  displayedColumns: string[] = ['actions', 'position', 'cityName','locationName','service'];
  dataSource = new MatTableDataSource(this.LOCATION_DATA);

  constructor(private matDialog:MatDialog, private _locationService:LocationService, private _snackbarService:CustomSnackBarService) { }

  ngOnInit(): void {
    this.loadLocationsData();
  }
  public editItem(locationId){
    let self=this;
    let locationData=_.find(self.LOCATION_DATA, (item)=>{
      return item.locationId==locationId;
    });
    locationData.operation='edit';
    locationData.selected=locationData.cityName;
    this.matDialog.open(LocationDialogComponent, {
      width: '500px',
      height: '500px',
      data:locationData
    });
  }

  public deleteItem(position){
    alert(position+" Clicked");
  }
  
  filterLocation(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addLocation(){
    const dialogRef = this.matDialog.open(LocationDialogComponent, {
      width: '500px',
      height: '500px'
    });
  }
  public loadLocationsData(){
    let self=this;
    this._locationService.loadAllCity().subscribe((response:any)=>{
      if(response.error && response.error!=''){
        this._snackbarService.errorSnackBar('Something went wrong!');
        return;
      }
      else{
        let responseData:any=response.data[0];
        if(responseData.length > 0){
          responseData.forEach(element => {
            let city=element.city;
            if(city && city.status==true){
              let location:any={};
              location.locationId=element.locationId;
              location.locationName=element.locationName;
              location.cityName=city.cityName;
              location.status=element.status;
              if(element.status==true){
                location.service='Active';
              }
              if(element.status==false){
                location.service='Inactive'
              }
              self.LOCATION_DATA.push(location);
            }
          });
          self.dataSource = new MatTableDataSource(self.LOCATION_DATA);
          this._snackbarService.successSnackBar('Successfully Fetched!');
        }
        else{
          this._snackbarService.successSnackBar('No Record Found!');
        }
      }
    },
    (error:any)=>{

    });
  }

}
