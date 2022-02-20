import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CustomSnackBarService } from 'src/app/services/helper/custom-snack-bar.service';
import { HomeService } from 'src/app/services/home.service';

export interface Request {
  id: number;
  name: string;
  email: string;
  phone: string;
  date:string;
  status: string;
}

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  REQUEST_DATA: Request[] = [];
  displayedColumns: string[] = ['status', 'date', 'name', 'phone', 'email','action'];
  dataSource = new MatTableDataSource(this.REQUEST_DATA);

  constructor(private _snackbarService: CustomSnackBarService, 
    private loader:NgxUiLoaderService,private _admin:HomeService) { }


  ngOnInit(): void {
    this.loadAllRequests();
  }

  filterRequest(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateStatus(request:any){
    var self = this;
    let confirm = window.confirm("Are you sure want to update status of callback request ?");
    if(confirm){
      self.loader.start();
      this._admin.updateCallStatus(request).subscribe(
        (response: any) => {
          if (response.erorr && response.error != '') {
            this._snackbarService.errorSnackBar("Status updation failed!...Please Try Again");
            this.loadAllRequests();
            this.loader.stop();
            return;
          } else {
            let responseData = response;
            if(responseData.success == 'saved'){
              this._snackbarService.successSnackBar("Status updated successfully..");
              this.loadAllRequests();
            }
            this.loader.stop();
          }
        },
        (error: any) => {
          this._snackbarService.errorSnackBar("Status updation failed!...Please Try Again");
          this.loadAllRequests();
          this.loader.stop();
          return;
        });
    }
  }

  loadAllRequests() {
    this.loader.start();
    this._admin.loadAllRequests().subscribe(
      (response: any) => {
        if (response.erorr && response.error != '') {
          this._snackbarService.errorSnackBar("Something went wrong!...Please Try Again");
          this.loader.stop();
          return;
        } else {
          let responseData: any = response.data;
          if (responseData) {
            this.REQUEST_DATA = responseData;
            this.dataSource = new MatTableDataSource(this.REQUEST_DATA);
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

  deleteCallStatus(requestId:any){
    var self = this;
    let confirm = window.confirm("Are you sure want to delete status of callback request ?");
    if(confirm){
      self.loader.start();
      this._admin.deleteCallStatus(requestId).subscribe(
        (response: any) => {
          if (response.erorr && response.error != '') {
            this._snackbarService.errorSnackBar("Status deletion failed!...Please Try Again");
            this.loadAllRequests();
            this.loader.stop();
            return;
          } else {
            let responseData = response;
            if(responseData.success == 'deleted'){
              this._snackbarService.successSnackBar("Status deleted successfully..");
              this.loadAllRequests();
            }
            this.loader.stop();
          }
        },
        (error: any) => {
          this._snackbarService.errorSnackBar("Status deletion failed!...Please Try Again");
          this.loadAllRequests();
          this.loader.stop();
          return;
        });
    }
  }

}
