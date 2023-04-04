import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TravelNearByDialogComponent } from './travel-near-by-components/travel-near-by-dialog/travel-near-by-dialog.component';
import { LandMarkService } from '../../../../services/land-mark.service';
import { CustomSnackBarService } from '../../../../services/helper/custom-snack-bar.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';
import { SharedService } from '../../../../services/helper/shared.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

export interface TraverlNearBy {
  cityName: string,
  cityId: number,
  locationName: string,
  locationId: number,
  subLocationName: string,
  subLocationId: number,
  pgName: string,
  pgId:number,
  landmarkId: number,
  landmarkName: string,
  landmarkImageName: string,
  landmarkImage: string,
  operation: string
}

@Component({
  selector: 'app-traverl-near-by',
  templateUrl: './traverl-near-by.component.html',
  styleUrls: ['./traverl-near-by.component.css']
})
export class TraverlNearByComponent implements OnInit,AfterViewInit {

  sanitizer;
  TRAVEL_NEARBY_DATA: TraverlNearBy[] = [];
  columns: string[] = ["actions", "position", "landMarkImage", "landmarkName", "pgName", "subLocationName"];
  dataSource = new MatTableDataSource(this.TRAVEL_NEARBY_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _matDialog: MatDialog, private _landMarkService: LandMarkService, private _snackBarService: CustomSnackBarService, private _sanitizer: DomSanitizer,
    private _sharedService: SharedService) { }
  ngOnInit(): void {
    this.sanitizer = this._sanitizer;
    this.loadAllLandMarks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadAllLandMarks() {
    let self = this;
    self._landMarkService.loadAllLandMarks().subscribe((response: any) => {
      if (response.error && response.error != '') {
        this._snackBarService.errorSnackBar("Something went wrong!");
        return;
      }
      else {
        let responseData: [] = response.data;
        if (response.total == 0) {
          this._snackBarService.successSnackBar("No Record Found!");
          return;
        }
        else {
          let fetchStatus = response.success;
          if (fetchStatus == 'Fetched') {
            responseData.forEach(element => {
              let data: any = element;
              let rowData: any = {};
              rowData.landmarkId = data.landMarkId;
              rowData.landmarkName = data.landMarkName;
              rowData.landmarkImageName = data.landMarkImageName;
              rowData.landmarkImage = data.landMarkImage;
              rowData.pgName = data.pgStayId.pgName;
              rowData.pgId=data.pgStayId.pgId;
              rowData.subLocationName = data.pgStayId.subLocation.subLocationName;
              rowData.subLocationId = data.pgStayId.subLocation.subLocationId;
              rowData.locationName = data.pgStayId.subLocation.location.locationName;
              rowData.locationId = data.pgStayId.subLocation.location.locationId;
              rowData.cityName = data.pgStayId.subLocation.location.city.cityName;
              rowData.cityId = data.pgStayId.subLocation.location.city.cityId;
              this.TRAVEL_NEARBY_DATA.push(rowData);
            });
            this.dataSource = new MatTableDataSource(this.TRAVEL_NEARBY_DATA);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this._snackBarService.successSnackBar("Successfully Fetched!");
          }
          else {
            this._snackBarService.errorSnackBar("Something went wrong!");
            return;
          }
        }
      }
    },
      (error) => {
        this._snackBarService.errorSnackBar("Something went wrong");
        return;
      });

  }

  addTravelNearBy() {
    this._matDialog.open(TravelNearByDialogComponent, {
      height: "580px",
      width: "600px",
      disableClose: true
    });
  }
  editNearBy(landmarkId) {
    let landMarkData: any = _.find(this.TRAVEL_NEARBY_DATA, (element) => {
      return element.landmarkId == landmarkId;
    });
    landMarkData.operation = 'edit';
    this._matDialog.open(TravelNearByDialogComponent, {
      height: "580px",
      width: "600px",
      disableClose: true,
      data: landMarkData
    });
  }
  deleteNearBy(landmarkId) {
    let self = this;
    let deleteConfirmStatus = window.confirm("Are you sure...you want to delete this Landmark!");
    if (deleteConfirmStatus) {
      self._landMarkService.deleteLandMark(landmarkId).subscribe((response: any) => {
        if (response.error && response.error != '') {
          this._snackBarService.errorSnackBar(response.error);
          return;
        }
        else {
          let deleteStatus = response.success;
          if (deleteStatus == "deleted") {
            this._snackBarService.successSnackBar("Landmark Deleted Successfully!");
            this._sharedService.redirectTo("/admin/traverl-nearby");
          }
          else {
            this._snackBarService.errorSnackBar("Deletion Failed!");
            return;
          }
        }
      },
        (error) => {
          self._snackBarService.errorSnackBar("Something went wrong!");
          return;
        });
    }
    else{
      self._snackBarService.successSnackBar("Deletion Cancelled!");
      return;
    }
  }
  filterSubLocation(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
