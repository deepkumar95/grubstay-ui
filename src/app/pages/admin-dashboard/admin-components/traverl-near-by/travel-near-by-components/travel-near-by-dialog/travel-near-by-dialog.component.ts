import { Component, OnInit, Inject } from '@angular/core';
import { CustomSnackBarService } from '../../../../../../services/helper/custom-snack-bar.service';
import { CityServiceService } from '../../../../../../services/city-service.service';
import { LocationService } from '../../../../../../services/location.service';
import { SubLocationService } from '../../../../../../services/sub-location.service';
import { setFlagsFromString } from 'v8';
import { LandMarkService } from '../../../../../../services/land-mark.service';
import { PgService } from '../../../../../../services/pg.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../../../../../../services/helper/shared.service';
import { TraverlNearByComponent, TraverlNearBy } from '../../traverl-near-by.component';
import { TravelNearbyComponent } from '../../../../../../components/travel-nearby/travel-nearby.component';
import { NgxUiLoaderComponent } from 'ngx-ui-loader/lib/core/ngx-ui-loader.component';
import { NgxUiLoaderModule, NgxUiLoaderHttpConfig, NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-travel-near-by-dialog',
  templateUrl: './travel-near-by-dialog.component.html',
  styleUrls: ['./travel-near-by-dialog.component.css']
})
export class TravelNearByDialogComponent implements OnInit {

  travelNearBy: any = {
    cityName: '',
    cityId: '',
    locationName: '',
    locationId: '',
    subLocationName: '',
    subLocationId: '',
    stayId: '',
    stayName: '',
    landMarkName: '',
    landMarkImageName: '',
    landMarkImage: '',
    operation: ''
  }

  cities: any = [];
  locations: any = [];
  subLocations: any = [];
  stays: any = [];
  citySelected: any;
  locationSelected: any;
  subLocationSelected: any;
  staySelected: any;
  imageUrl: any = '';
  imageName: any = '';
  selectedImage: any;

  constructor(private _snackBarService: CustomSnackBarService, private _cityService: CityServiceService, private _locationService: LocationService, private _subLocationService: SubLocationService,
    private _landMarkService: LandMarkService, private _pgService: PgService, public dialogRef: MatDialogRef<TravelNearByDialogComponent>, private _sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) private data: TraverlNearBy, private loader: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.loadAllCity();
    if (this.data) {
      if (this.data.operation == 'edit') {
        this.loader.start();
        this.loadLocationsData(this.data.cityId);
        this.loadSubLocationData(this.data.locationId);
        this.loadStayData(this.data.subLocationId);
        this.citySelected = this.data.cityName;
        this.locationSelected = this.data.locationName;
        this.subLocationSelected = this.data.subLocationName;
        this.staySelected = this.data.pgName;
        this.travelNearBy.landMarkName = this.data.landmarkName;
        this.travelNearBy.operation = this.data.operation;
        this.travelNearBy.landMarkImageName = this.data.landmarkImageName;
        this.travelNearBy.cityId = this.data.cityId;
        this.travelNearBy.cityName = this.data.cityName;
        this.travelNearBy.locationId = this.data.locationId;
        this.travelNearBy.locationName = this.data.locationName;
        this.travelNearBy.subLocationId = this.data.subLocationId;
        this.travelNearBy.subLocationName = this.data.subLocationName;
        this.travelNearBy.stayId = this.data.pgId;
        this.travelNearBy.stayName = this.data.pgName;
        this.loader.stop();
      }
    }
  }
  addTravelNearBy() {
    let self = this;
    if (!self.travelNearBy.cityId && self.travelNearBy.cityId <= 0 && !self.travelNearBy.cityName && self.travelNearBy.cityName == '') {
      self._snackBarService.errorSnackBar("Please Select City!");
      return;
    }
    if (!self.travelNearBy.locationId && self.travelNearBy.locationId <= 0 && !self.travelNearBy.locationName && self.travelNearBy.locationName == '') {
      self._snackBarService.errorSnackBar("Please Select Location!");
      return;
    }
    if (!self.travelNearBy.subLocationId && self.travelNearBy.subLocationId <= 0 && !self.travelNearBy.subLocationName && self.travelNearBy.subLocationName == '') {
      self._snackBarService.errorSnackBar("Please Select Sub Location!");
      return;
    }
    if (!self.travelNearBy.stayId && self.travelNearBy.stayId <= 0 && !self.travelNearBy.stayName && self.travelNearBy.stayName == '') {
      self._snackBarService.errorSnackBar("Please Select Stay!");
      return;
    }
    if (!self.travelNearBy.landMarkName && self.travelNearBy.landMarkName == '') {
      self._snackBarService.errorSnackBar("Please Enter Landmark name!");
      return;
    }
    const formData = new FormData();
    if (self.travelNearBy.operation != "edit") {
      if (self.imageName == '' && !self.imageName) {
        self._snackBarService.errorSnackBar("Please Select Image!");
        return;
      }
      formData.append("landMarkName", self.travelNearBy.landMarkName);
      formData.append("cityId", self.travelNearBy.cityId);
      formData.append("locationId", self.travelNearBy.locationId);
      formData.append("subLocationId", self.travelNearBy.subLocationId);
      formData.append("landmarkimage", self.selectedImage);
      formData.append("stayId", self.travelNearBy.stayId);
      this._landMarkService.addLandMark(formData).subscribe((response: any) => {
        if (response.error && response.error != '') {
          this._snackBarService.errorSnackBar(response.error);
        }
        else {
          let addStatus = response.success;
          if (addStatus == "saved") {
            this._snackBarService.successSnackBar("LandMark Added Successfully");
            this.dialogRef.close();
            this._sharedService.redirectTo("/admin/traverl-nearby");
          } else {
            this._snackBarService.errorSnackBar("Something went wrong!");
            return
          }
        }
      },
        (error) => {
          this._snackBarService.errorSnackBar("Something went wrong!");
          return;
        });
    }
    else {
      if (self.selectedImage != null && self.selectedImage) {
        formData.append("landmarkimage", self.selectedImage);
        formData.append("landMarkId", self.data.landmarkId.toString());
        this._landMarkService.updateLandMark(formData).subscribe((response: any) => {
          if (response.error && response.error != '') {
            this._snackBarService.errorSnackBar(response.error);
          }
          else {
            let addStatus = response.success;
            if (addStatus == "updated") {
              this._snackBarService.successSnackBar("LandMark Updated Successfully!");
              this.dialogRef.close();
              this._sharedService.redirectTo("/admin/traverl-nearby");
            } else {
              this._snackBarService.errorSnackBar("Something went wrong!");
              return
            }
          }
        },
          (error) => {
            this._snackBarService.errorSnackBar("Something went wrong!");
            return;
          });
      }
      else {
        this._snackBarService.successSnackBar("Location Updated Successfully!");
        this.dialogRef.close();
        this._sharedService.redirectTo("/admin/traverl-nearby");
        return;
      }
    }
  }
  selectLocation(location) {

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

  public loadLocationsData(cityId) {
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
              if (city.cityId == cityId) {
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

  loadSubLocationData(locationId) {
    var self = this;
    self.subLocations = [];
    this._subLocationService.loadAllSubLocation().subscribe((response: any) => {
      if (response.error && response.error != '') {
        this._snackBarService.errorSnackBar('Something went wrong!');
      }
      else {
        let responseData = response.data[0];
        if (responseData.length > 0) {
          responseData.forEach(element => {
            let location = element.location;
            if (location && location.status == true) {
              if (location.locationId == locationId) {
                let subLocation: any = {};
                subLocation.subLocationId = element.subLocationId;
                subLocation.subLocationName = element.subLocationName;
                subLocation.locationName = location.locationName;
                subLocation.status = element.status;
                if (element.status == true) {
                  subLocation.service = 'Active';
                  self.subLocations.push(subLocation);
                }
                if (element.status == false) {
                  subLocation.service = 'Inactive'
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
  loadStayData(subLocationId) {
    var self = this;
    self._pgService.loadAllPGData().subscribe((response: any) => {
      if (response.error && response.error != '') {
        self._snackBarService.errorSnackBar("Couldn't fetch pg datas !");
        return;
      } else {
        let responseData: any = response.data;
        if (responseData) {
          responseData.forEach(element => {
            let subLocation = element.subLocation;
            if (subLocation && subLocation.status == true) {
              if (subLocation.subLocationId == subLocationId) {
                let stay: any = {};
                stay.stayId = element.pgId;
                stay.stayName = element.pgName;
                stay.status = element.status;
                if (element.status == true) {
                  self.stays.push(stay);
                  element.service = 'Active';
                }
                if (element.status == false) {
                  element.service = 'Inactive'
                }
              }
            }
          });
        }
        else {
          self._snackBarService.errorSnackBar("Stays Not Available at this SubLocation!");
          return;
        }
      }
    }, (error: any) => {
      self._snackBarService.errorSnackBar("Couldn't fetch pg datas !");
      return;
    })
  }
  onSelectImage(event) {
    if (event.target.files) {
      let file = event.target.files;
      let fileIsValid = true;
      if (file[0].type != 'image/jpeg' && file[0].type != 'image/png' && file[0].type != 'image/jpg') {
        this._snackBarService.errorSnackBar('File type should be JPEG/PNG/JPG');
        let fileInput: any = document.getElementById(event.target.id);
        fileInput.value = '';
        fileIsValid = false;
        return;
      }
      let maxFileSize = (file[0].size / 1000000);
      if (maxFileSize > 2) {
        this._snackBarService.errorSnackBar('File is too large...Please change the image!');
        let fileInput: any = document.getElementById(event.target.id);
        fileInput.value = '';
        fileIsValid = false;
        return;
      }
      if (fileIsValid) {
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = (events: any) => {
          this.imageUrl = events.target.result;
          this.imageName = file.name;
          this.travelNearBy.landMarkImageName = file.name;
          this.selectedImage = file[0];
        }
      }
    }
  }
}
