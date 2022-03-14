import { Component, OnInit } from '@angular/core';
import { CustomSnackBarService } from '../services/helper/custom-snack-bar.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-raise-query',
  templateUrl: './raise-query.component.html',
  styleUrls: ['./raise-query.component.css']
})
export class RaiseQueryComponent implements OnInit {
  query:any = {};

  constructor(private snackBar:CustomSnackBarService,private _user:UserServiceService) { }

  ngOnInit(): void {
  }

  checkPhone(phone){
    if(phone){
      if(phone.toString().length > 10 || phone.toString().length < 10){
        this.snackBar.errorSnackBar("Phone number must be of 10 digits");
        document.getElementById('phone').focus();
        return;
      }
    }
  }

  raiseQuery(){

  }
}
