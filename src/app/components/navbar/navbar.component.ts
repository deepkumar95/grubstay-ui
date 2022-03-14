import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';
import { SharedService } from 'src/app/services/helper/shared.service';
import { LoginService } from 'src/app/services/login.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('drawer') drawer : MatDrawer;

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
    this.drawer.close();
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '440px',
      height: '500px',
      disableClose: true 
    });
  }

  openSignUpDialog(): void {
    this.drawer.close();
    const dialogRef = this.dialog.open(SignupDialogComponent, {
      width: '500px',
      height: '600px',
      disableClose: true 
    });
  }
  
  logout(){
    let status = this._login.logout();
    if(status){window.location.reload();}
  }

  redirectTo(){
    if(this._login.getUserRole() == 'ADMIN' || this._login.getUserRole() == 'SUB-ADMIN'){
      this._shared.redirectTo('/admin');
    }else{
      return;
    }
  }

  goTo(item:string){
    if(item === 'home'){
      this.drawer.close();
      this._shared.redirectTo('/home');
    }
    if(item === 'guest_policy'){
      this.drawer.close();
      this._shared.redirectTo('/guest-policy');
    }
    if(item === 'about'){
      this.drawer.close();
      this._shared.redirectTo('/about');
    }
    if(item === 'raise_queries'){
      this.drawer.close();
      this._shared.redirectTo('raise-query');
    }
  }

}
