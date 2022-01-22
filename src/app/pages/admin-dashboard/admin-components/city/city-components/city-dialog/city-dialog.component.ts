import { E } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CityServiceService } from 'src/app/services/city-service.service';
import { CustomSnackBarService } from '../../../../../../services/helper/custom-snack-bar.service';
import { City } from '../../city.component';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../../services/helper/shared.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-city-dialog',
  templateUrl: './city-dialog.component.html',
  styleUrls: ['./city-dialog.component.css']
})
export class CityDialogComponent implements OnInit {

  imageUrl = '';
  imageName: any = '';
  selectedImage: any = '';
  public sanitizer;

  city: any = {
    cityName: '',
    cityImage: '',
    cityImageName: '',
    status: false
  };

  constructor(private _snackBar: CustomSnackBarService, private _http: HttpClient, private _cityService: CityServiceService,
    @Inject(MAT_DIALOG_DATA) public data: City, private dialogRef: MatDialogRef<CityDialogComponent>, 
    private _sharedService: SharedService, private domSanitizer: DomSanitizer,private loader:NgxUiLoaderService) {
    this.sanitizer = domSanitizer;
  }

  ngOnInit(): void {
    if (this.data) {
      this.city = this.data;
      this.imageName = this.data.cityImageName;
    }
  }

  upload(file: any) {
    console.log(file)
  }
  addCity() {
    let self = this;
    if (self.city.operation != 'edit') {
      if (!self.city.cityName && self.city.cityName == '') {
        this._snackBar.errorSnackBar("City name is required!");
        return;
      }
      if (!self.imageName && self.imageName == '') {
        this._snackBar.errorSnackBar("Please choose city image!");
        return;
      }
      const fd = new FormData();
      fd.append('image', this.selectedImage, this.selectedImage.name);
      fd.append('cityName', this.city.cityName);
      fd.append('status', this.city.status);
      fd.append('cityImageName', this.selectedImage.name);
      this.loader.start();
      this._cityService.addCity(fd).subscribe((response: any) => {
        if (response.error && response.error != '') {
          if (response.error.includes('Duplicate')) {
              this._snackBar.errorSnackBar('City Already Present!');
              this.loader.stop();
              return
          } else {
            this._snackBar.errorSnackBar(response.error);
            this.loader.stop();
            return;
          }
        } else {
          this.dialogRef.close();
          //this._snackBar.successSnackBar("saved successflly!");
          this._sharedService.redirectTo('/admin/city');
        }
        this.loader.stop();
      }, (error) => {
        this._snackBar.errorSnackBar(error);
        this.loader.stop();
        return;
      })
      if (self.city.operation != 'edit') {
      }
    } else {
      self.updateCity();
    }
  }
  public updateCity() {
    let self = this;
    const fd = new FormData();
    if (this.selectedImage && this.selectedImage.name && this.selectedImage.name != '') {
      fd.append('image', this.selectedImage, this.selectedImage.name);
      fd.append('cityImageName', this.selectedImage.name);
    } else {
      fd.append('cityImageName', this.city.cityImageName);
    }
    fd.append('cityName', this.city.cityName);
    fd.append('status', this.city.status);
    if (self.city.operation == 'edit') {
      fd.append('cityId', this.city.cityId);
      if (this.selectedImage && this.selectedImage.name && this.selectedImage != '') {
        this.loader.start();
        this._cityService.updateCityWithImage(fd).subscribe((response: any) => {
          if (response.error && response.error != '') {
            this._snackBar.errorSnackBar("Something went wrong!...Please Try Again");
            this.loader.stop();
            return;
          }
          else {
            let updateStatus = response.success;
            if (updateStatus == 'success') {
              this.dialogRef.close();
              //this._snackBar.successSnackBar('Updated Successfully!');
              this._sharedService.redirectTo('/admin/city');
            }
            else {
              this._snackBar.errorSnackBar("Something went wrong!...Please Try Again");
              this.loader.stop();
              return;
            }
          }
        }, (error) => {
          this._snackBar.errorSnackBar("Something went wrong!...Please Try Again");
          this.loader.stop();
          return;
        });
      }
      else {
        this.loader.start();
        this._cityService.updateCityWithoutImage(fd).subscribe((response: any) => {
          if (response.error && response.error != '') {
            this._snackBar.errorSnackBar("Something went wrong!...Please Try Again");
            this.loader.stop();
            return;
          }
          else {
            let updateStatus = response.success;
            if (updateStatus == 'success') {
              this.dialogRef.close();
              //this._snackBar.successSnackBar('Updated Successfully!');
              this._sharedService.redirectTo('/admin/city');
            }
            else {
              this._snackBar.errorSnackBar("Something went wrong!...Please Try Again");
              this.loader.stop();
              return;
            }
          }
        }, (error) => {
          this._snackBar.errorSnackBar("Something went wrong!...Please Try Again");
          this.loader.stop();
          return;
        });
      }
    }
  }

  onSelectImage(event) {
    if (event.target.files) {
      let file = event.target.files;
      let fileIsValid = true;
      if (file[0].type != 'image/jpeg' && file[0].type != 'image/png' && file[0].type != 'image/jpg') {
        this._snackBar.errorSnackBar('File type should be JPEG/PNG/JPG');
        let fileInput: any = document.getElementById(event.target.id);
        fileInput.value = '';
        fileIsValid = false;
        return;
      }
      let maxFileSize = (file[0].size / 1000000);
      if (maxFileSize > 2) {
        this._snackBar.errorSnackBar('File is too large...Please change the image!');
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
          this.selectedImage = file[0];
        }
      }
    }
  }
}
