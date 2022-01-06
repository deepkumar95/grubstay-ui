import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LocationDialogComponent } from './location-components/location-dialog/location-dialog.component';
import { LocationService } from '../../../../services/location.service';
import { CustomSnackBarService } from '../../../../services/helper/custom-snack-bar.service';
import * as _ from 'lodash';
import { SharedService } from '../../../../services/helper/shared.service';

export interface Location {
  locationId: number;
  locationName: string;
  cityId: number;
  cityName: string;
  operation: string;
  status: string;
  service: string;
  selected: string;
}


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})


export class LocationComponent implements OnInit {
  LOCATION_DATA: Location[] = [];
  displayedColumns: string[] = ['actions', 'position', 'cityName', 'locationName', 'service'];
  dataSource = new MatTableDataSource(this.LOCATION_DATA);

  constructor(private matDialog: MatDialog, private _locationService: LocationService, private _snackbarService: CustomSnackBarService, private _sharedService: SharedService) { }

  ngOnInit(): void {
    this.loadLocationsData();
  }
  public editItem(locationId) {
    let self = this;
    let locationData = _.find(self.LOCATION_DATA, (item) => {
      return item.locationId == locationId;
    });
    locationData.operation = 'edit';
    locationData.selected = locationData.cityName;
    this.matDialog.open(LocationDialogComponent, {
      width: '500px',
      height: '500px',
      disableClose: true,
      data: locationData
    });
  }

  public deleteLocation(locationId) {
    let self = this;
    if (locationId) {
      let confirm = window.confirm("Are you sure..You want to delete this Record");
      if (confirm) {
        self._locationService.deleteLocation(locationId).subscribe((response: any) => {
          if (response.error && response.error != '') {
            self._snackbarService.errorSnackBar("Something went wrong!");
            return;
          }
          else {
            let deleteStatus = response.success;
            if (deleteStatus == 'Deleted') {
              self._snackbarService.successSnackBar("Location Deleted Successfully!");
              this._sharedService.redirectTo("/admin/location");
            }
            else {
              self._snackbarService.errorSnackBar("Location Deletion Failed!");
              return;
            }
          }
        },
          (error) => {

          });
      }
      else {
        self._snackbarService.errorSnackBar("Location Deletion Failed!");
        return;
      }
    }
  }

  filterLocation(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addLocation() {
    const dialogRef = this.matDialog.open(LocationDialogComponent, {
      width: '500px',
      height: '500px',
      disableClose: true
    });
  }
  public loadLocationsData() {
    let self = this;
    this._locationService.loadAllLocation().subscribe((response: any) => {
      if (response.error && response.error != '') {
        this._snackbarService.errorSnackBar('Something went wrong!');
        return;
      }
      else {
        let responseData: any = response.data[0];
        if (responseData.length > 0) {
          responseData.forEach(element => {
            let city = element.city;
            if (city && city.status == true) {
              let location: any = {};
              location.locationId = element.locationId;
              location.locationName = element.locationName;
              location.cityName = city.cityName;
              location.status = element.status;
              if (element.status == true) {
                location.service = 'Active';
              }
              if (element.status == false) {
                location.service = 'Inactive'
              }
              self.LOCATION_DATA.push(location);
            }
          });
          self.dataSource = new MatTableDataSource(self.LOCATION_DATA);
          this._snackbarService.successSnackBar('Successfully Fetched!');
        }
        else {
          this._snackbarService.successSnackBar('No Record Found!');
        }
      }
    },
      (error: any) => {

      });
  }

}
