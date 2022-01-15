import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackBarService } from 'src/app/services/helper/custom-snack-bar.service';
import { SharedService } from 'src/app/services/helper/shared.service';
import { HomeService } from 'src/app/services/home.service';
import { LoginService } from 'src/app/services/login.service';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  user:any={
    username: '',
    password:''
  };
  globalUser:any = {};
  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, private snackBar:CustomSnackBarService,private dialog:MatDialog,private _home:HomeService,private _shared:SharedService,private _login:LoginService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public login(){
    let self=this;
    if(!self.user.username && self.user.username==''){
      // alert("Username is Required!");
      self.snackBar.errorSnackBar("Username is required ...!");
      return;
    }
    if(!self.user.password && self.user.password==''){
      // alert("Username is Required!");
      self.snackBar.errorSnackBar("Password is required!");
      return;
    }
    let credential:any={};
    credential.username = self.user.username;
    credential.password = self.user.password;
    self._home.login(credential).subscribe((response:any)=>{
      if(response.error && response.error != ''){
        self.snackBar.errorSnackBar("Couldn't login...");
        return;
      }else{
        if(response.success == 'success'){
          let responseData = response.data[0];
          let authority = response.data[0].authorities[0].authority;
             self.globalUser = responseData;
             self.dialogRef.close();
             this._login.setUser(self.globalUser);
             if(authority == 'ADMIN' || authority == 'SUB-ADMIN'){
              self._shared.redirectTo('/admin');
              this._login.loginStatusSubject.next(true);
             }else{
              self._shared.redirectTo('/');
              this._login.loginStatusSubject.next(true);
             }
        }
        else{
          self.snackBar.errorSnackBar("invalid credentials...try again!");
          return;
        }
      }
    },(error:any)=>{
        self.snackBar.errorSnackBar("Couldn't login...");
    })
  
  }

  openSignupDialog(){
    this.dialogRef.close();
    const dialogRef = this.dialog.open(SignupDialogComponent, {
      width: '500px',
      height: '600px',
      disableClose: true 
    });
  }

}
