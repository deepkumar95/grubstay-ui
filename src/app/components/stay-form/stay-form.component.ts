import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CustomSnackBarService } from 'src/app/services/helper/custom-snack-bar.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-stay-form',
  templateUrl: './stay-form.component.html',
  styleUrls: ['./stay-form.component.css']
})
export class StayFormComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
  );

  stayForm:any = {
    name:'',
    email:'',
    phone:'',
    whatsapp:'',
    college:'',
    area:'HSR Layout',
    shiftDate:'',
    refrel:''
  }

  formIsValid:boolean = true;

  constructor(private breakpointObserver:BreakpointObserver,
    private snackBar:CustomSnackBarService,private _user:UserServiceService) { }

  ngOnInit(): void {
  }

  checkForm(){
    var self = this;
    this.formIsValid = true;
    if(!self.stayForm.name && self.stayForm.name == ''){
      self.snackBar.errorSnackBar("Name is required !");
      this.formIsValid = false;
      return;
    }
    if(!self.stayForm.email && self.stayForm.email == ''){
      self.snackBar.errorSnackBar("email is required !");
      this.formIsValid = false;
      return;
    }
    if(self.stayForm.phone=='' && !self.stayForm.phone){
      self.snackBar.errorSnackBar("Phone number is required !");
      this.formIsValid = false;
      return;
    }
    if(self.stayForm.whatsapp=='' && !self.stayForm.whatsapp){
      self.snackBar.errorSnackBar("Whatsapp number is required !");
      this.formIsValid = false;
      return;
    }
    if(self.stayForm.college=='' && !self.stayForm.college){
      self.snackBar.errorSnackBar("College name is required !");
      this.formIsValid = false;
      return;
    }
    if(!self.stayForm.shiftDate && self.stayForm.shiftDate == ''){
      self.snackBar.errorSnackBar("Shift date is required !");
      this.formIsValid = false;
      return;
    }
    if(self.stayForm.area==''){
      self.snackBar.errorSnackBar("please select area..!");
      this.formIsValid = false;
      return;
    }
    self.checkPhone(self.stayForm.phone);
    self.checkWhatsapp(self.stayForm.whatsapp);
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

  public registerStayForm(){
    let self=this;
    let check = self.checkForm();
    if(self.formIsValid){
      self._user.registerStayForm(self.stayForm).subscribe((response:any)=>{
        if(response.error && response.error != ''){
          self.snackBar.errorSnackBar("Registration failed.. try again !");
          return;
        }else{
          let responseData = response;
          if(responseData.success == 'saved'){
            self.stayForm = {};
            self.snackBar.successSnackBar("Registered successfully..");
          }
        }
      },(error:any)=>{
        self.snackBar.errorSnackBar("Registration failed.. try again !");
        return;
      })
    }
  }

}
