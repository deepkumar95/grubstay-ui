import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, private snackBar:MatSnackBar,private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public login(){
    let self=this;
    if(!self.user.username && self.user.username==''){
      // alert("Username is Required!");
      self.snackBar.open("Username is required!", '', {duration:1000});
      return;
    }
    if(!self.user.password && self.user.password==''){
      // alert("Username is Required!");
      self.snackBar.open("Password is required!", '', {duration:1000});
      return;
    }
    alert("Registration Successfully Done!");
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
