import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SublocationDialogComponent } from './sublocation-components/sublocation-dialog/sublocation-dialog.component';
import { SubLocationService } from '../../../../services/sub-location.service';
import { CustomSnackBarService } from '../../../../services/helper/custom-snack-bar.service';
import * as _ from 'lodash';
import { SharedService } from '../../../../services/helper/shared.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

export interface SubLocation {
  subLocationId: number;
  subLocationName: string;
  locationId: number;
  locationName: string;
  cityId:number,
  cityName: string,
  operation: string;
  status: string;
  service: string;
  selected: string;
}


@Component({
  selector: 'app-sublocation',
  templateUrl: './sublocation.component.html',
  styleUrls: ['./sublocation.component.css']
})
export class SublocationComponent implements OnInit {

  SUBLOCATION_DATA: SubLocation[]=[];
  columns:string[]=["actions", "position", "cityName", "locationName", "subLocationName", "service"];
  dataSource=new MatTableDataSource(this.SUBLOCATION_DATA);

  constructor(private matDialog:MatDialog, private _subLocationService:SubLocationService, private _snackBarService:CustomSnackBarService,
    private _sharedService:SharedService,private loader:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.loadAllSubLocationData();
  }
  addSubLocation() {
    this.matDialog.open(SublocationDialogComponent, {
      height:'500px',
      width:'500px',
      disableClose: true
    });
  }
  editSubLocation(subLocationId) {
    let self = this;
    let subLocationData = _.find(self.SUBLOCATION_DATA, (element) => {
      return element.subLocationId == subLocationId;
    });
    subLocationData.operation = 'edit';
    this.matDialog.open(SublocationDialogComponent, {
      height: '500px',
      width: '500px',
      disableClose: true,
      data: subLocationData
    });
  }
  deleteLocation(subLocationId) {
    let self = this;
    let deleteConfirm = window.confirm("Are you sure..you want to delete it?");
    if (deleteConfirm) {
      self.loader.start();
      self._subLocationService.deleteSubLocation(subLocationId).subscribe((response: any) => {
        if (response.error && response.error != '') {
          this._snackBarService.errorSnackBar("Something went wrong!");
          self.loader.stop();
          return;
        }
        else {
          let deleteStatus = response.success;
          if (deleteStatus == 'deleted') {
            //this._snackBarService.successSnackBar("SubLocation deleted successfully!");
            this._sharedService.redirectTo("/admin/sub-location");
          }
          else {
            this._snackBarService.errorSnackBar("SubLocation deletion failed");
            self.loader.stop();
            return;
          }
          self.loader.stop();
        }
      },
        (error) => {
          this._snackBarService.errorSnackBar("Something went wrong!");
          self.loader.stop();
          return;
        });
    }
    else{
      this._snackBarService.errorSnackBar("SubLocation deletion cancelled!");
      self.loader.stop();
      return;
    }
  }
  filterSubLocation(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadAllSubLocationData() {
    let self = this;
    self.loader.start();
    self._subLocationService.loadAllSubLocation().subscribe((response: any) => {
      if (response.error && response.error != '') {
        this._snackBarService.errorSnackBar(response.error);
        self.loader.stop();
        return;
      }
      else {
        let responseData: any = response.data[0];
        if (responseData.length > 0) {
          responseData.forEach(element => {
            let subLocation: any = {};
            if (element.location.city && element.location.city.status == true && element.location && element.location.status == true) {
              if (element.status == true) {
                subLocation.service = 'Active';
              }
              if (element.status == false) {
                subLocation.service = 'Inactive';
              }
              subLocation.status=element.status;
              subLocation.subLocationId = element.subLocationId;
              subLocation.subLocationName = element.subLocationName;
              subLocation.locationName = element.location.locationName;
              subLocation.locationId = element.location.locationId;
              subLocation.cityId = element.location.city.cityId;
              subLocation.cityName = element.location.city.cityName;
              this.SUBLOCATION_DATA.push(subLocation);
            }
          });
          this.dataSource = new MatTableDataSource(this.SUBLOCATION_DATA);
          self.loader.stop();
        }
        else {
          this._snackBarService.successSnackBar('No Record Found!');
          self.loader.stop();
          return;
        }
        self.loader.stop();
      }
    },
      (error) => {
        this._snackBarService.errorSnackBar('Something went wrong');
        self.loader.stop();
        return;
    });
  }
}
