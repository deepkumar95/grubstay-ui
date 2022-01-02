import { Component, OnInit, Inject } from '@angular/core';
import { CityServiceService } from '../../../../../../services/city-service.service';
import { CustomSnackBarService } from '../../../../../../services/helper/custom-snack-bar.service';
import { LocationService } from '../../../../../../services/location.service';
import { SubLocationService } from '../../../../../../services/sub-location.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../../../../../../services/helper/shared.service';
import { SubLocation } from '../../sublocation.component';

@Component({
  selector: 'app-sublocation-dialog',
  templateUrl: './sublocation-dialog.component.html',
  styleUrls: ['./sublocation-dialog.component.css']
})
export class SublocationDialogComponent implements OnInit {

  citySelected;
  locationSelected;

  subLocation: any = {
    subLocationName: '',
    subLocationId: 0,
    locationName: '',
    locationId: '',
    cityName: '',
    cityId: '',
    status: '',
    position: '',
    operation: 'add'
  }

  location: any = {
    locationName: '',
    locationId: ''
  }
  city: any = {
    cityName: '',
    cityId: ''
  }

  cities: any = [];
  locations: any = [];

  constructor(private _cityService: CityServiceService, private _snackBarService: CustomSnackBarService, private _locationService: LocationService, private _subLocationService: SubLocationService, private dialogRef: MatDialogRef<SublocationDialogComponent>,
    private _sharedService: SharedService, @Inject(MAT_DIALOG_DATA) public data: SubLocation) { }

  ngOnInit(): void {
    if (this.data) {
      this.subLocation = this.data;
      this.citySelected = this.data.cityName;
      let location: any = {};
      location.locationName = this.data.locationName;
      location.locationId = this.data.locationId;
      this.locations.push(location);
      this.locationSelected = this.data.locationName;
    }
    // if(this.data.operation=='edit'){
    //   this.loadLocationsData();
    // }
    // this.locationSelected=this.data.locationName; 
    this.loadAllCity();
  }

  selectCity(city) {
    this.city.cityName = city.cityName;
    this.city.cityId = city.cityId;
    this.subLocation.cityId = city.cityId;
    this.subLocation.cityName = city.cityName
    this.loadLocationsData();
  }

  selectLocation(location) {
    this.location.locationName = location.locationName;
    this.location.locationid = location.locationId;
    this.subLocation.locationId = location.locationId;
    this.subLocation.locationName = location.locationName;
  }

  addSubLocation() {
    let self = this;
    if (self.subLocation.operation != 'edit') {
      if (!self.subLocation.cityId || self.subLocation.cityId == 0) {
        self._snackBarService.errorSnackBar('Please select city');
        return;
      }
      if (!self.subLocation.locationId || self.subLocation.locationId == 0) {
        self._snackBarService.errorSnackBar('Please select location');
        return;
      }
      if (!self.subLocation.subLocationName || self.subLocation.subLocationName == '') {
        self._snackBarService.errorSnackBar('Please enter sublocation');
        return;
      }
      // if(!self.subLocation.status || self.subLocation.status==false){
      //   this._snackBarService.errorSnackBar('Please select status');
      //   return;
      // }
      const formData = new FormData();
      formData.append("subLocationName", self.subLocation.subLocationName);
      formData.append("locationId", self.subLocation.locationId);
      formData.append("cityId", self.subLocation.cityId);
      self._subLocationService.addSubLocation(formData).subscribe((response: any) => {
        if (response.error && response.error != '') {
          self._snackBarService.errorSnackBar("Something went wrong!");
          return;
        } else {
          let addStatus = response.success;
          if (addStatus == 'success') {
            self._snackBarService.successSnackBar("SubLocation Added Successfully!");
            self.dialogRef.close();
            self._sharedService.redirectTo("/admin/sub-location");
          } else {
            self._snackBarService.errorSnackBar("Something went wrong!");
            return;
          }
        }
      },
        (error) => {
          self._snackBarService.errorSnackBar("Something went wrong!");
          return;
        });
    }
    else {
      self.updateSubLocation();
    }
  }

  updateSubLocation() {
    let self = this;
    const formData = new FormData();
    formData.append("subLocationName", self.subLocation.subLocationName);
    formData.append("subLocationId", self.subLocation.subLocationId);
    formData.append("status", self.subLocation.status);
    self._subLocationService.updateSubLocation(formData).subscribe((response: any) => {
      if (response.error && response.error != '') {
        this._snackBarService.errorSnackBar("Something went wrong!");
        return;
      }
      else {
        let updateStatus = response.success;
        if (updateStatus == 'update') {
          this._snackBarService.successSnackBar("SubLocation updated successfully!");
          this.dialogRef.close();
          this._sharedService.redirectTo("/admin/sub-location");
        }
        else {
          this._snackBarService.errorSnackBar("SubLocation updation failed!");
          return;
        }
      }
    },
      (error) => {
        this._snackBarService.errorSnackBar("Something went wrong!");
        return;
      });
  }

  public loadLocationsData() {
    let self = this;
    self.locations = [];
    this._locationService.loadAllLocation().subscribe((response: any) => {
      if (response.error && response.error != '') {
        this._snackBarService.errorSnackBar('Something went wrong!');
      }
      else {
        let responseData = response.data[0];
        if (responseData.length > 0) {
          responseData.forEach(element => {
            let city = element.city;
            if (city && city.status == true) {
              if (city.cityId == this.city.cityId) {
                let location: any = {};
                location.locationId = element.locationId;
                location.locationName = element.locationName;
                location.cityName = city.cityName;
                location.status = element.status;
                if (element.status == true) {
                  location.service = 'Active';
                  self.locations.push(location);
                }
                if (element.status == false) {
                  location.service = 'Inactive'
                }
              }
            }
          });
        }
        else {
          this._snackBarService.errorSnackBar("No Location Found");
        }
      }
    },
      (error) => {

      });

  }

  loadAllCity() {
    this._cityService.loadAllCity().subscribe(
      (response: any) => {
        if (response.erorr && response.error != '') {
          this._snackBarService.errorSnackBar("Something went wrong!...Please Try Again");
          return;
        } else {
          let responseData: any = response.data;
          if (responseData) {
            responseData.forEach(element => {
              if (element.status == true) {
                let city: any = {};
                city.cityId = element.cityId;
                city.cityName = element.cityName;
                this.cities.push(city);
              }
            });
          }
          this._snackBarService.successSnackBar("Successfully Fetched!");
        }
      },
      (error: any) => {
        this._snackBarService.errorSnackBar("Something went wrong!...Please Try Again");
        return;
      });
  }
}
