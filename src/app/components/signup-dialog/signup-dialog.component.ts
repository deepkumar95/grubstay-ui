import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomSnackBarService } from 'src/app/services/helper/custom-snack-bar.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent implements OnInit {

  user={
    firstName:'',
    lastName:'',
    phone:'',
    whatsapp:'',
    username:'',
    email:'',
    password:'',
    dob:'',
    gender:''
  }

  formIsValid:boolean = true;

  constructor(private snackBar:CustomSnackBarService,private _user:UserServiceService,private diaolgRef:MatDialogRef<SignupDialogComponent>) { }

  ngOnInit(): void {
  }

  public register(){
    let self=this;
    let check = self.checkForm();
    if(self.formIsValid){
      self.user.dob = self.formatDate(self.user.dob);
      self._user.createUser(self.user).subscribe((response:any)=>{
        if(response.error && response.error != ''){
          self.snackBar.errorSnackBar("Signup failed.. try again !");
          return;
        }else{
          let responseData = response;
          if(responseData.success == 'saved'){
            self.snackBar.successSnackBar("User created successfully..");
            self.diaolgRef.close();
          }
        }
      },(error:any)=>{
        self.snackBar.errorSnackBar("Signup failed.. try again !");
        return;
      })
    }
  }

  checkForm(){
    var self = this;
    this.formIsValid = true;
    if(!self.user.firstName && self.user.firstName == ''){
      self.snackBar.errorSnackBar("First Name is required !");
      this.formIsValid = false;
      return;
    }
    if(!self.user.lastName && self.user.lastName == ''){
      self.snackBar.errorSnackBar("Last Name is required !");
      this.formIsValid = false;
      return;
    }
    if(self.user.phone=='' && !self.user.phone){
      self.snackBar.errorSnackBar("Phone number is required !");
      this.formIsValid = false;
      return;
    }
    if(!self.user.username && self.user.username == ''){
      self.snackBar.errorSnackBar("Username is required !");
      this.formIsValid = false;
      return;
    }
    if(!self.user.password && self.user.password == ''){
      self.snackBar.errorSnackBar("Password is required !");
      this.formIsValid = false;
      return;
    }
    if(!self.user.dob && self.user.dob == ''){
      self.snackBar.errorSnackBar("Date of Birth is required !");
      this.formIsValid = false;
      return;
    }
    if(self.user.gender==''){
      self.snackBar.errorSnackBar("please select gender..!");
      this.formIsValid = false;
      return;
    }
    self.checkPhone(self.user.phone);
    self.checkWhatsapp(self.user.whatsapp);
    self.checkPassword(self.user.password);
    self.checkUsername(self.user.username);
    return this.formIsValid;
  }

  checkPhone(phone){
    if(phone){
      if(phone.toString().length > 10 || phone.toString().length < 10){
        this.snackBar.errorSnackBar("Phone number must be of 10 digits");
        document.getElementById('phone').focus();
        this.formIsValid = false;
        return;
      }
    }
  }

  checkWhatsapp(phone){
    if(phone){
      if(phone.toString().length > 10 || phone.toString().length < 10){
        this.snackBar.errorSnackBar("Whatsapp number must be of 10 digits");
        document.getElementById('whatsapp').focus();
        this.formIsValid = false;
        return;
      }
    }
  }

  checkPassword(password){
    if(password){
      if(password.length < 5){
        this.snackBar.errorSnackBar("Password must be at least 4 characters in length");
        document.getElementById('password').focus();
        this.formIsValid = false;
        return;
      }
    }
  }

  checkUsername(username){
    if(username){
      this._user.checkUser(username).subscribe((response:any)=>{
        if(response.error && response.error != ''){
          this.snackBar.errorSnackBar("Something went wrong...try again ...!");
          return;
        }else{
          if(response.success == 'found'){
            this.snackBar.errorSnackBar("username is already exist...try different");
            this.formIsValid = false;
            document.getElementById("username").focus();
            return;
          }else{
            this.formIsValid = true;
          }
        }
      },(error:any)=>{
        this.snackBar.errorSnackBar("Something went wrong...try again ...!");
        return;
      })
    }
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

}
