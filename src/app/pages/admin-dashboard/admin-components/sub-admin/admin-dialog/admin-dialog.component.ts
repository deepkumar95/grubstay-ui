import { Component, OnInit, Inject } from '@angular/core';
import { CustomSnackBarService } from '../../../../../services/helper/custom-snack-bar.service';
import { UserServiceService } from '../../../../../services/user-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../sub-admin.component';
import { SharedService } from '../../../../../services/helper/shared.service';

export interface Admin {
  firstName: string,
  lastName: string,
  phone: string,
  whatsapp: string,
  username: string,
  password: string,
  email: string,
}

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css']
})
export class AdminDialogComponent implements OnInit {

  user = {
    userId: '',
    firstName: '',
    lastName: '',
    phone: '',
    whatsapp: '',
    username: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    operation: ''
  }

  formIsValid: boolean = true;

  constructor(private snackBar: CustomSnackBarService, private _user: UserServiceService, private dialogRef: MatDialogRef<AdminDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: User, private _sharedService:SharedService) { }

  ngOnInit(): void {
    if (this.data) {
      if (this.data.operation == 'edit') {
        this.user.userId = this.data.userId;
        this.user.firstName = this.data.firstName;
        this.user.lastName = this.data.lastName;
        this.user.phone = this.data.phone;
        this.user.whatsapp = this.data.whatsapp;
        this.user.username = this.data.username;
        this.user.email = this.data.email;
        this.user.dob = this.data.dob;
        this.user.gender = this.data.gender;
        this.user.operation = this.data.operation;
      }
    }
  }
  addSubAdmin() {
    let self = this;
    self.checkForm();
    if (self.user.operation == 'edit') {
      if (this.formIsValid) {
        let data = this.user;
        this._user.updateAdmin(data).subscribe((response: any) => {
          if (response.error && response.error != '') {
            this.snackBar.errorSnackBar("User Updation Failed");
            return;
          }
          else {
            let responseData = response;
            if (responseData.success == 'updated') {
              self.snackBar.successSnackBar("User Updated successfully..");
              self.dialogRef.close();
              self._sharedService.redirectTo("/admin/sub-admin");
            }
          }
        }, (error: any) => {

        })
      }
      else {
        this.snackBar.errorSnackBar("Something missing, Please check!");
        return;
      }
    }
    else {
      if (this.formIsValid) {
        let data = this.user;
        this._user.createAdmin(data).subscribe((response: any) => {
          if (response.error && response.error != '') {
            this.snackBar.errorSnackBar("Sub-Admin Creation Failed");
            return;
          }
          else {
            let responseData = response;
            if (responseData.success == 'saved') {
              self.snackBar.successSnackBar("User created successfully..");
              self.dialogRef.close();
              self._sharedService.redirectTo("/admin/sub-admin");
            }
          }
        }, (error: any) => {
          this.snackBar.errorSnackBar("Sub-Admin Creation Failed");
          return;
        })
      }
      else {
        this.snackBar.errorSnackBar("Something missing, Please check!");
        return;
      }
    }
  }
  checkForm() {
    var self = this;
    this.formIsValid = true;
    if (!self.user.firstName && self.user.firstName == '') {
      self.snackBar.errorSnackBar("First Name is required !");
      this.formIsValid = false;
      return;
    }
    if (!self.user.lastName && self.user.lastName == '') {
      self.snackBar.errorSnackBar("Last Name is required !");
      this.formIsValid = false;
      return;
    }
    if (self.user.phone == '' && !self.user.phone) {
      self.snackBar.errorSnackBar("Phone number is required !");
      this.formIsValid = false;
      return;
    }
    if (!self.user.username && self.user.username == '') {
      self.snackBar.errorSnackBar("Username is required !");
      this.formIsValid = false;
      return;
    }
    if (!self.user.password && self.user.password == '') {
      if (self.user.operation != 'edit') {
        self.snackBar.errorSnackBar("Password is required !");
        this.formIsValid = false;
        return;
      }
    }
    if (!self.user.dob && self.user.dob == '') {
      self.snackBar.errorSnackBar("Date of Birth is required !");
      this.formIsValid = false;
      return;
    }
    if (!self.user.gender && self.user.gender == '') {
      self.snackBar.errorSnackBar("please select gender..!");
      this.formIsValid = false;
      return;
    }
    self.checkPhone(self.user.phone);
    self.checkPassword(self.user.password);
    if (self.user.operation != 'edit') {
      self.checkUsername(self.user.username);
    }
    return this.formIsValid;
  }

  checkPhone(phone) {
    if (phone) {
      this.user.whatsapp = phone;
      if (phone.toString().length > 10 || phone.toString().length < 10) {
        this.snackBar.errorSnackBar("Phone number must be of 10 digits");
        document.getElementById('phone').focus();
        this.formIsValid = false;
        return;
      }
    }
  }

  checkPassword(password) {
    if (password) {
      if (password.length < 5) {
        this.snackBar.errorSnackBar("Password must be at least 4 characters in length");
        document.getElementById('password').focus();
        this.formIsValid = false;
        return;
      }
    }
  }

  checkUsername(username) {
    if (username) {
      this._user.checkUser(username).subscribe((response: any) => {
        if (response.error && response.error != '') {
          this.snackBar.errorSnackBar("Something went wrong...try again ...!");
          return;
        } else {
          if (response.success == 'found') {
            this.snackBar.errorSnackBar("username is already exist...try different");
            this.formIsValid = false;
            document.getElementById("username").focus();
            return;
          } else {
            this.formIsValid = true;
          }
        }
      }, (error: any) => {
        this.snackBar.errorSnackBar("Something went wrong...try again ...!");
        return;
      })
    }
  }

}
