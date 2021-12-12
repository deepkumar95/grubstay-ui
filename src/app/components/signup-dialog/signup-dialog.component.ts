import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent implements OnInit {

  public user:any={
    username:'',
    password:'',
    first_name:'',
    last_name:'',
    email:'',
    phone:''
  }
  constructor(private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  public register(){
    let self=this;
    if(!self.user.username && self.user.username==''){
      self.snackBar.open("Username is required!", '', {duration:1000});
      return;
    }
    if(!self.user.password && self.user.password==''){
      self.snackBar.open("Password is required!", '', {duration:1000});
      return;
    }
    if(!self.user.first_name && self.user.first_name==''){
      self.snackBar.open("First name is required!", '', {duration:1000});
      return;
    }
    if(!self.user.last_name && self.user.last_name==''){
      self.snackBar.open("Last name is required!", '', {duration:1000});
      return;
    }
    if(!self.user.email && self.user.email==''){
      self.snackBar.open("Email is required!", '', {duration:1000});
      return;
    }
    if(!self.user.phone && self.user.phone==''){
      self.snackBar.open("Phone No. is required!", '', {duration:1000});
      return;
    }
    alert("Register called");
  }
  public resetFields(){
    let self=this;
    self.user.username='';
    self.user.password='';
    self.user.first_name='';
    self.user.last_name='';
    self.user.email='';
    self.user.phone='';
  }

}
