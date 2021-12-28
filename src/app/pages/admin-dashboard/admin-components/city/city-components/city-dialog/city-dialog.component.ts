import { E } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CityServiceService } from 'src/app/services/city-service.service';
import { CustomSnackBarService } from '../../../../../../services/helper/custom-snack-bar.service';
import { City } from '../../city.component';

@Component({
  selector: 'app-city-dialog',
  templateUrl: './city-dialog.component.html',
  styleUrls: ['./city-dialog.component.css']
})
export class CityDialogComponent implements OnInit {

  imageUrl='';
  selectedImage:any='';

  city:any={
    cityName:'',
    cityImage:'',
    status:''
  };

  constructor(private _snackBar:CustomSnackBarService,private _http:HttpClient,private _cityService: CityServiceService,
    @Inject(MAT_DIALOG_DATA) public data: City) { }

  ngOnInit(): void {
    if(this.data){
      this.city = this.data;
    }
  }

  upload(file:any){
    console.log(file)
  }
  addCity(){
    let self=this;
    if(!self.city.cityName && self.city.cityName==''){
      this._snackBar.errorSnackBar("City name is required!");
      return;
    }
    if(!self.city.cityImage && self.city.cityImage==''){
      this._snackBar.errorSnackBar("Please choose city image!");
      return;
    }
    const fd = new FormData();
    fd.append('image', this.selectedImage, this.selectedImage.name);
    fd.append('cityName',this.city.cityName);
    fd.append('status',this.city.status);
    fd.append('cityImage',this.selectedImage.name);
    this._cityService.addCity(fd).subscribe((response:any)=>{
      if (response.erorr && response.error != '') {
        this._snackBar.errorSnackBar("Something went wrong!...Please Try Again");
        return;
      } else  {
        this._snackBar.successSnackBar("saved successflly!");
      }
    },(error)=>{
      this._snackBar.errorSnackBar("Something went wrong!...Please Try Again");
    })

  }
  onSelectImage(event){
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (events:any)=>{
        this.imageUrl = events.target.result;
        this.city.cityImage = event.target.files[0].name;
        this.selectedImage = event.target.files[0];
      }
    }
  }
}
