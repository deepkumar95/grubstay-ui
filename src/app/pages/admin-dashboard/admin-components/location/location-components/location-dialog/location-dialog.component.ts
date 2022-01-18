import { Component, OnInit, Inject } from '@angular/core';
import { CityServiceService } from '../../../../../../services/city-service.service';
import { CustomSnackBarService } from '../../../../../../services/helper/custom-snack-bar.service';
import { LocationService } from '../../../../../../services/location.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../../../../../../services/helper/shared.service';
import { Location } from '../../location.component'


@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.css']
})

export class LocationDialogComponent implements OnInit {

  selected;

  location: any = {
    cityId: 0,
    cityName: '',
    locationId: '',
    locationName: '',
    position: 0,
    status: false
  }

  city: any = {
    cityId: 0,
    cityName: ''
  }

  cities: any = [];

  constructor(private _cityService: CityServiceService, private _snackBarService: CustomSnackBarService, private _locationService: LocationService, private dialogRef: MatDialogRef<LocationDialogComponent>,
    private _sharedService: SharedService, @Inject(MAT_DIALOG_DATA) public data: Location) { }

  ngOnInit(): void {
    this.loadAllCity();
    if (this.data) {
      console.log(this.data);
      this.selected = this.data.cityName;
      this.location = this.data;
    }
  }

  addLocation() {
    let self = this;
    if (self.location.operation != 'edit') {
      if (self.city.cityId == 0) {
        this._snackBarService.errorSnackBar('Please select city!');
        return;
      }
      if (!self.location.locationName || self.location.locationName == '') {
        this._snackBarService.errorSnackBar('Please select location!');
        return;
      }
      const locationData = new FormData();
      locationData.append('locationName', self.location.locationName);
      locationData.append('status', self.location.status);
      locationData.append('cityId', self.city.cityId);
      if (locationData) {
        self._locationService.addLocation(locationData).subscribe((response: any) => {
          if (response.error && response.error != '') {
            this._snackBarService.errorSnackBar('Something went wrong...Try Again!');
            return;
          } else {
            let addStatus = response.success;
            if (addStatus == 'saved') {
              this._snackBarService.successSnackBar('Location Added Successfully!');
              this.dialogRef.close();
              this._sharedService.redirectTo('admin/location');
            }
            else {
              this._snackBarService.errorSnackBar('Something went wrong...Try Again!');
              return;
            }
          }
        },
          (error) => {
            this._snackBarService.errorSnackBar('Something went wrong...Try Again!');
            return;
          });
      }
    } else {
      self.updateLocation();
    }
  }
  updateLocation() {
    let self = this;
    const formData = new FormData();
    formData.append('locationName', self.location.locationName);
    formData.append('status',self.location.status);
    formData.append('locationId', self.location.locationId);
    this._locationService.updateLocation(formData).subscribe((response: any) => {
      if (response.error && response.error != '') {
        this._snackBarService.errorSnackBar("Something went wrong!");
        return;
      } else {
        let updatedStatus = response.success;
        if (updatedStatus == 'updated') {
          this._snackBarService.successSnackBar("Location updated Successfully!");
          this.dialogRef.close();
          this._sharedService.redirectTo("/admin/location")
        } else {
          this._snackBarService.errorSnackBar("Location updation Failed!");
          return;
        }
      }
    },
    (error) => {
      this._snackBarService.errorSnackBar(error);
      return;
    });
  }
  selectCity(city) {
    let self = this;
    self.city.cityId = city.cityId;
    self.city.cityName = city.cityName;
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
        }
      },
      (error: any) => {
        this._snackBarService.errorSnackBar("Something went wrong!...Please Try Again");
        return;
      });
  }
}
