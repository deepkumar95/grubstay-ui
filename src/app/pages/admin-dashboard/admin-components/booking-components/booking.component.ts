import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CustomSnackBarService } from 'src/app/services/helper/custom-snack-bar.service';
import { HomeService } from 'src/app/services/home.service';
import * as internal from 'stream';

export interface Booking {
  id: number;
  amount: number;
  orderID:string;
  paymentID:string;
  recipt:string;
  status:string;
  username:string;
  fullname:string;
  email: string;
  phoneNo: string;
  bookingDate: string;
  reserveDate:string;
  sharingType:string;
  pgName:string;
  pgID: string;
  bookingStatus:string;
  bookingStatusReference:string;
}

@Component({
  selector: 'bookings',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit,AfterViewInit {

  BOOKING_DATA: Booking[] = [];
  displayedColumns: string[] = ['orderID', 'amount', 'paymentID', 'recipt', 'status','username','fullname','email','phoneNo','bookingDate','reserveDate','sharingType','pgName','bookingStatus','bookingStatusReference'];
  dataSource = new MatTableDataSource(this.BOOKING_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _snackbarService: CustomSnackBarService, 
    private loader:NgxUiLoaderService,private _admin:HomeService) { }

  ngOnInit(): void {
    this.loadAllBookings();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterRequest(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadAllBookings() {
    this.loader.start();
    this._admin.loadAllBookings().subscribe(
      (response: any) => {
        if (response.erorr && response.error != '') {
          this._snackbarService.errorSnackBar("Something went wrong!...Please Try Again");
          this.loader.stop();
          return;
        } else {
          let responseData: any = response.data[0];
          if (responseData) {
            this.BOOKING_DATA = responseData;
            this.dataSource = new MatTableDataSource(this.BOOKING_DATA);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          this.loader.stop();
          //this._snackbarService.successSnackBar("Successfully Fetched!");
        }
      },
      (error: any) => {
        this._snackbarService.errorSnackBar("Something went wrong!...Please Try Again");
        this.loader.stop();
        return;
      });
  }
}
