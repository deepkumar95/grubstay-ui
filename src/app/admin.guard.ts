import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomSnackBarService } from './services/helper/custom-snack-bar.service';
import { SharedService } from './services/helper/shared.service';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _shared:SharedService,private _snackBar:CustomSnackBarService,private _login:LoginService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this._login.isLoggedIn() && (this._login.getUserRole()== 'ADMIN' || this._login.getUserRole()=='SUB-ADMIN')){
      return true;
    }
     this._shared.redirectTo('/');
     return false;
  } 
  
}
