import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackBarService {

  constructor(private matSnackBar:MatSnackBar) { }

  public errorSnackBar(message:string){
    let config=new MatSnackBarConfig();
    config.panelClass=['error-class'];
    config.duration=1000;
    this.matSnackBar.open(message, '',config);
  }

  public successSnackBar(message:string){
    let config=new MatSnackBarConfig();
    config.panelClass=['success-class'];
    config.duration=1000;
    this.matSnackBar.open(message, '',config);
  }

}
