import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CustomSnackBarService } from '../../../../../../services/helper/custom-snack-bar.service';

@Component({
  selector: 'app-city-dialog',
  templateUrl: './city-dialog.component.html',
  styleUrls: ['./city-dialog.component.css']
})
export class CityDialogComponent implements OnInit {

  city:any={
    city_name:'',
    city_desc:'',
    city_image:''
  }

  constructor(private _snackBar:CustomSnackBarService) { }

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
    if(!self.city.city_desc && self.city.city_desc==''){
      this._snackBar.errorSnackBar("City Description is required!");
      return;
    }
    if(!self.city.city_image && self.city.city_image==''){
      this._snackBar.errorSnackBar("Please choose city image!");
      return;
    }
    this._snackBar.successSnackBar("City Added Successfully!");

  }
}
