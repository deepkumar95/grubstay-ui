import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { element } from 'protractor';
import { CityServiceService } from 'src/app/services/city-service.service';
import { CustomSnackBarService } from 'src/app/services/helper/custom-snack-bar.service';
import { SharedService } from 'src/app/services/helper/shared.service';
import { LocationService } from 'src/app/services/location.service';
import { PgService } from 'src/app/services/pg.service';
import { SubLocationService } from 'src/app/services/sub-location.service';
import { PG } from '../pg-operation.component';

@Component({
  selector: 'app-pg-op-dialog',
  templateUrl: './pg-op-dialog.component.html',
  styleUrls: ['./pg-op-dialog.component.css']
})
export class PgOpDialogComponent implements OnInit {

  cities: any = [];
  locations: any = [];
  subLocations: any = [];
  pgGallery: any = [];
  citySelected: any;
  locationSelected: any;
  subLocationSelected: any;

  pg: any = {
    subLocationId: '',
    pgName: '',
    pgDesc: '',
    pgAddress: '',
    pgGender: '',
    weekly: false,
    monthly: true,
    daily: false,
    singleMemPgPrc: '',
    doubleMemPgPrc: '',
    tripleMemPgPrc: '',
    fourMemPgPrc: '',
    distFromSubLoc: '',
    operation: '',
    cityId: '',
    locationId: '',
    amenitiesServices: {},
    roomFacility: {},
    status: false
  }

  amenities = [];
  amenitiesList = [
    { name: '24x7 Secuirty Serveillance', code: 'securitySurvialance' },
    { name: 'High-Speed Wifi', code: 'wifi' },
    { name: 'Dining Area', code: 'diningArea' },
    { name: 'Delicious Meals', code: 'meals' },
    { name: 'Power Backup', code: 'powerBackUp' },
    { name: 'TV', code: 'tv' },
    { name: 'Lift', code: 'lift' },
    { name: 'Washing Machine', code: 'washingMachine' },
    { name: 'Parking Area', code: 'parkingArea' },
    { name: 'Water Filter', code: 'waterFilter' },
  ];
  roomFacilities = [];
  roomFacilitiesList = [
    { name: 'Attached Bathroom', code: 'attachedWashroom' },
    { name: 'Bed With Matress', code: 'bedWithMattress' },
    { name: 'Ceiling Fan', code: 'ceilingFan' },
    { name: 'Hot Water Supply', code: 'hotWatersupply' },
    { name: 'TV with DTH', code: 'tvDth' },
    { name: 'Wardrobes', code: 'wardrobe' },
    { name: 'Saftey Lockers', code: 'safetyLocker' },
    { name: 'Table & Chairs', code: 'tableChair' }
  ];

  constructor(private _cityService: CityServiceService, private _locationService: LocationService, private _snackBarService: CustomSnackBarService, private _snackBar: CustomSnackBarService, 
    private _pg: PgService, private _subLocationService: SubLocationService,
    private dialogRef: MatDialogRef<PgOpDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: PG, private _shared: SharedService,private loader:NgxUiLoaderService) { }

  ngOnInit(): void {
    var self = this;
    self.loadAllCity();
    if (self.data) {
      self.pg = self.data;
      if (self.pg.operation == 'edit') {
        self.citySelected = self.pg.subLocation.location.city.cityName;
        self.loadLocationsData(self.pg.subLocation.location.city.cityId);
        self.locationSelected = self.pg.subLocation.location.locationName;
        self.loadSubLocationData(self.pg.subLocation.location.locationId);
        self.subLocationSelected = self.pg.subLocation.subLocationName;
        self.loadAmenAndRoomFacs(self.pg);
      }
    }
    else {
      self.amenities = this.amenitiesList;
      self.roomFacilities = this.roomFacilitiesList;
    }
  }
  addPg() {
    var self = this;
    const pgForm = new FormData();
    if (self.pg.subLocationId == '' && !self.pg.subLocationId) {
      this._snackBar.errorSnackBar('PG Sub-Location is required !');
      return;
    }
    if (self.pg.pgName == '' && !self.pg.pgName) {
      this._snackBar.errorSnackBar('PG name is required !');
      return;
    }
    if (self.pg.pgGender == '' && !self.pg.pgGender) {
      this._snackBar.errorSnackBar('PG gender is required !');
      return;
    }
    if (self.pg.weekly == false && self.pg.daily == false && self.pg.monthly == false) {
      this._snackBar.errorSnackBar('Atleast one stay plan should be selected !');
      return;
    }
    if (!self.pg.singleMemPgPrc && !self.pg.doubleMemPgPrc && !self.pg.tripleMemPgPrc && !self.pg.fourMemPgPrc) {
      this._snackBar.errorSnackBar('Atleast one occupency should given!');
      return;
    }
    if (self.pg.pgAddress == '' && !self.pg.pgAddress) {
      this._snackBar.errorSnackBar('PG Address is required !');
      return;
    }
    if (self.pg.pgDesc == '' && !self.pg.pgDesc) {
      this._snackBar.errorSnackBar('PG Description is required !');
      return;
    }
    if (self.pgGallery.length == 0 && self.pg.operation != 'edit') {
      this._snackBar.errorSnackBar('Atleast one image is required for PG !');
      return;
    }
    if (this.pgGallery.length > 0) {
      let valid = false;
      this.pgGallery.forEach(image => {
        if (image.imageName.includes("pgmain")) {
          valid = true;
        }
      });
      if (!valid) {
        this._snackBar.errorSnackBar('PG main image(like _pgmain) is missing..!');
        let fileInput: any = document.getElementById('pg_gallery');
        fileInput.value = '';
        this.pgGallery = [];
        return;
      }
    }
    self.pg.amenitiesServices = {};
    self.pg.roomFacility = {};
    self.amenities.forEach(element => {
      self.pg.amenitiesServices[element.code] = true;
    })
    self.amenitiesList.forEach(element => {
      if (!(element.code in self.pg.amenitiesServices)) {
        self.pg.amenitiesServices[element.code] = false;
      }
    })
    self.roomFacilities.forEach(element => {
      self.pg.roomFacility[element.code] = true;
    })
    self.roomFacilitiesList.forEach(element => {
      if (!(element.code in self.pg.roomFacility)) {
        self.pg.roomFacility[element.code] = false;
      }
    })
    console.log(self.pg);
    if (self.pg.operation == 'edit') {
      pgForm.append('pgId', self.pg.pgId);
    }
    pgForm.append('pgName', self.pg.pgName);
    pgForm.append('pgDesc', self.pg.pgDesc);
    pgForm.append('pgAddress', self.pg.pgAddress);
    pgForm.append('pgGender', self.pg.pgGender);
    pgForm.append('weekly', self.pg.weekly);
    pgForm.append('monthly', self.pg.monthly);
    pgForm.append('daily', self.pg.daily);
    pgForm.append('status', self.pg.status);
    pgForm.append('singleMemPgPrc', self.pg.singleMemPgPrc ? self.pg.singleMemPgPrc : 0);
    pgForm.append('doubleMemPgPrc', self.pg.doubleMemPgPrc ? self.pg.doubleMemPgPrc : 0);
    pgForm.append('tripleMemPgPrc', self.pg.tripleMemPgPrc ? self.pg.tripleMemPgPrc : 0);
    pgForm.append('fourMemPgPrc', self.pg.fourMemPgPrc ? self.pg.fourMemPgPrc : 0);
    pgForm.append('distFromSubLoc', self.pg.distFromSubLoc ? self.pg.distFromSubLoc : 0);
    pgForm.append('status', self.pg.status);
    if (self.pg.operation == 'edit') {
      pgForm.append('subLocationId', self.pg.subLocation.subLocationId);
    } else {
      pgForm.append('subLocationId', self.pg.subLocationId);
    }
    pgForm.append('amens', JSON.stringify(self.pg.amenitiesServices));
    pgForm.append('roomFacs', JSON.stringify(self.pg.roomFacility));
    if (self.pg.operation != 'edit') {
      self.pgGallery.forEach(element => {
        pgForm.append('pgImages[]', element.selectedImage, element.name)
      });
    } else {
      if (self.pgGallery.length > 0) {
        self.pgGallery.forEach(element => {
          pgForm.append('pgImages[]', element.selectedImage, element.name)
        });
      }
      else {
        pgForm.append('pgImages[]', new Blob(), 'noImage');
      }
    }
    if (self.pg.operation != 'edit') {
      self.loader.start();
      self._pg.savePgData(pgForm).subscribe((response: any) => {
        if (response.error && response.error != '') {
          self._snackBar.errorSnackBar("PG creation failed...try again !");
          self.loader.stop();
          return;
        }
        else {
          let savedStaus = response.success;
          if (savedStaus == 'saved') {
            //self._snackBar.successSnackBar("PG saved successfully");
            self.dialogRef.close();
            self._shared.redirectTo("/admin/pg");
          } else if (savedStaus == 'duplicate') {
            self._snackBar.errorSnackBar("PG already exist...!");
            self.loader.stop();
            return;
          }
          else {
            self._snackBar.errorSnackBar("PG creation failed...try again !");
            self.loader.stop();
            return;
          }
          self.loader.stop();
        }
      }, (error: any) => {
        self._snackBar.errorSnackBar("PG creation failed...try again !");
        self.loader.stop();
        return;
      })
    }
    else {
      self.loader.start();
      self._pg.updatePgData(pgForm).subscribe((response: any) => {
        if (response.error && response.error != '') {
          self._snackBar.errorSnackBar("PG updation failed...try again !");
          self.loader.stop();
          return;
        }
        else {
          let savedStaus = response.success;
          if (savedStaus == 'success') {
            //self._snackBar.successSnackBar("PG updated successfully");
            self.dialogRef.close();
            self._shared.redirectTo("/admin/pg");
          }
          else {
            self._snackBar.errorSnackBar("PG updation failed...try again !");
            self.loader.stop();
            return;
          }
          self.loader.stop();
        }
      }, (error: any) => {
        self._snackBar.errorSnackBar("PG updation failed...try again !");
        self.loader.stop();
        return;
      })
    }
  }

  loadAllCity() {
    let self = this;
    self.loader.start();
    this._cityService.loadAllCity().subscribe(
      (response: any) => {
        if (response.erorr && response.error != '') {
          this._snackBarService.errorSnackBar("Something went wrong!...Please Try Again");
          self.loader.stop();
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
          self.loader.stop();
        }
      },
      (error: any) => {
        this._snackBarService.errorSnackBar("Something went wrong!...Please Try Again");
        self.loader.stop();
        return;
      });
  }

  public loadLocationsData(cityId) {
    let self = this;
    self.locations = [];
    self.loader.start();
    this._locationService.loadAllLocation().subscribe((response: any) => {
      if (response.error && response.error != '') {
        this._snackBarService.errorSnackBar('Something went wrong!');
        self.loader.stop();
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
          self.loader.stop();
        }
        else {
          this._snackBarService.errorSnackBar("No Location Found");
          self.loader.stop();
        }
      }
    },
      (error) => {
        self.loader.stop();
      });
  }

  loadSubLocationData(locationId) {
    var self = this;
    self.subLocations = [];
    self.loader.start();
    this._subLocationService.loadAllSubLocation().subscribe((response: any) => {
      if (response.error && response.error != '') {
        this._snackBarService.errorSnackBar('Something went wrong!');
        self.loader.stop();
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
          self.loader.stop();
        }
        else {
          this._snackBarService.errorSnackBar("No Location Found");
          self.loader.stop();
        }
      }
    },
      (error) => {
        self.loader.stop();
      });
  }

  onSelectImage(event) {
    if (event.target.files) {
      let files = event.target.files;
      if (files.length > 4) {
        this._snackBar.errorSnackBar('Only 4 or less than 4 files are allowed..');
        let fileInput: any = document.getElementById(event.target.id);
        fileInput.value = '';
        this.pgGallery = [];
        return;
      }
      for (let i = 0; i < files.length; i++) {
        let fileIsValid = true;
        if (files[i].type != 'image/jpeg' && files[i].type != 'image/png' && files[i].type != 'image/jpg') {
          this._snackBar.errorSnackBar(files[i].name + ': File type should be JPEG/PNG/JPG');
          let fileInput: any = document.getElementById(event.target.id);
          fileInput.value = '';
          this.pgGallery = [];
          fileIsValid = false;
          return;
        }
        let maxFileSize = (files[i].size / 1000000);
        if (maxFileSize > 2) {
          this._snackBar.errorSnackBar(files[i].name + ': File is too large...Please change the image!');
          let fileInput: any = document.getElementById(event.target.id);
          fileInput.value = '';
          this.pgGallery = [];
          fileIsValid = false;
          return;
        }
        if (fileIsValid) {
          var reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = (events: any) => {
            let pgPart: any = {};
            pgPart.index = i;
            pgPart.imageUrl = events.target.result;
            pgPart.imageName = files[i].name;
            pgPart.selectedImage = files[i];
            this.pgGallery.push(pgPart);
          }
        }
      }
    }
    console.log(this.pgGallery)
  }

  loadAmenAndRoomFacs(pg) {
    var self = this;
    let amen: any = pg.amenitiesServices;
    let room: any = pg.roomFacility;
    var amenKeys = Object.entries(amen).filter(([, v]) => v == true).map(([k]) => k);
    var roomKeys = Object.entries(room).filter(([, v]) => v == true).map(([k]) => k);
    amenKeys.forEach(e1 => {
      self.amenitiesList.forEach(element => {
        if (e1 == element.code) {
          self.amenities.push(element);
        }
      })
    })
    roomKeys.forEach(e1 => {
      self.roomFacilitiesList.forEach(element => {
        if (e1 == element.code) {
          self.pg.roomFacility[element.code] = true;
          self.roomFacilities.push(element);
        }
      })
    })
  }

}
