import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, private snackBar:MatSnackBar) { }

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

}
