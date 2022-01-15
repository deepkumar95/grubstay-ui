import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';
import { SharedService } from 'src/app/services/helper/shared.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user:any = {};

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
  );

  constructor(private breakpointObserver:BreakpointObserver, private dialog:MatDialog,private _shared:SharedService,private _login:LoginService) { 
  }

  ngOnInit(): void {
    this.isLoggedIn = this._login.isLoggedIn();
    this.user = this._login.getUser();
    this._login.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn = this._login.isLoggedIn();
      this.user = this._login.getUser();
    })
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '440px',
      height: '500px',
      disableClose: true 
    });
  }

  openSignUpDialog(): void {
    const dialogRef = this.dialog.open(SignupDialogComponent, {
      width: '500px',
      height: '600px',
      disableClose: true 
    });
  }
  
  logout(){
    this._login.logout();
    window.location.reload();
  }

}
