import { E } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CustomSnackBarService } from '../../../../../../services/helper/custom-snack-bar.service';

@Component({
  selector: 'app-city-dialog',
  templateUrl: './city-dialog.component.html',
  styleUrls: ['./city-dialog.component.css']
})
export class CityDialogComponent implements OnInit {

  imageUrl='';
  selectedImage:any='';

  city:any={
    city_name:'',
    city_image:'',
    city_status:''
  }

  constructor(private _snackBar:CustomSnackBarService,private _http:HttpClient) { }

  ngOnInit(): void {
  }

  upload(file:any){
    console.log(file)
  }
  addCity(){
    let self=this;
    if(!self.city.city_name && self.city.city_name==''){
      this._snackBar.errorSnackBar("City name is required!");
      return;
    }
    if(!self.city.city_image && self.city.city_image==''){
      this._snackBar.errorSnackBar("Please choose city image!");
      return;
    }
    self.city.city_status = self.city.city_status=='true' ? 'active' : 'inactive';
    alert(self.city.city_status)
    const fd = new FormData();
    fd.append('image', this.selectedImage, this.selectedImage.name);
    

    this._snackBar.successSnackBar("City Added Successfully!");

  }
  onSelectImage(event){
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (events:any)=>{
        this.imageUrl = events.target.result;
        this.city.city_image = event.target.files[0].name;
        this.selectedImage = event.target.files[0];
      }
    }
  }
}
