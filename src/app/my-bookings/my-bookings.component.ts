import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CustomSnackBarService } from '../services/helper/custom-snack-bar.service';
import { LoginService } from '../services/login.service';
import { PgService } from '../services/pg.service';
import * as moment from 'moment';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _pgService: PgService,private loader: NgxUiLoaderService,private _login:LoginService, private _snackBarService: CustomSnackBarService,) {
    
  }

  allOrders:any = [];

  ngOnInit(): void {
    let user = this._login.getUser();
    this.getMyBookings(user.username);
  }

  public getMyBookings(username:string){
    if(username){
      this.loader.start();
      this._pgService.getBookingHistoryByUsername(username).subscribe((response: any) => {
        if (response.error && response.error != '') {
          this._snackBarService.errorSnackBar("couldn't fetch your bookings..try again!!");
          this.loader.stop();
          return;
        }
        else {
          this.loader.stop();
          let total = response.total;
          if (total > 0) {
            let responseData: [] = response.data[0];
            let bookingsArray:any = [];
            if (responseData) {
              // fetching all your bookings
                responseData.forEach((item:any)=> {
                  let order:any = {};
                  order.orderID = item.orderID;
                  order.paymentID = item.paymentID;
                  order.recipt = item.recipt;
                  order.status = item.status;
                  order.bookingDate = item.bookingDate;
                  order.reserveDate = item.reserveDate;
                  order.sharingType = item.sharingType;
                  order.pgName = item.pgName;
                  order.bookingStatus = item.bookingStatus;
                  order.amount = item.amount;
                  order.canCancel = false;
                // logic to check is it cancelable
                let current:any = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
                let end = moment(current,"YYYY-MM-DD HH:mm:ss");
                let start = moment(order.bookingDate,"YYYY-MM-DD HH:mm:ss");
                let minDiff = end.diff(start,"minutes");
                if(minDiff < 24*60){
                  order.canCancel = true;
                }
                bookingsArray.push(order);
                })
                this.allOrders = bookingsArray;
            }
          }
        }
      },
        (error) => {
          this.loader.stop();
          this._snackBarService.errorSnackBar("couldn't fetch your bookings..try again!!");
        })
    } else {
      this._snackBarService.errorSnackBar("couldn't fetch your bookings..try again!!");
      this.loader.stop();
      return;
    }
  }

  public cancelMyBooking(orderId:string){
    if(orderId){
      this.loader.start();
      this._pgService.cancelBookingByOrderId(orderId).subscribe((response: any) => {
        if (response.error && response.error != '') {
          this._snackBarService.errorSnackBar("couldn't cancel your bookings..try again!!");
          this.loader.stop();
          return;
        }
        else {
          this.loader.stop();
          this._snackBarService.successSnackBar("your booking has been cancelled !!");
          let user = this._login.getUser();
          this.getMyBookings(user.username);
        }
      },
        (error) => {
          this.loader.stop();
          this._snackBarService.errorSnackBar("couldn't cancel your bookings..try again!!");
        })
    } else {
      this._snackBarService.errorSnackBar("couldn't cancel your bookings..try again!!");
      this.loader.stop();
      return;
    }
  }

}
