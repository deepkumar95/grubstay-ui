import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CustomSnackBarService } from 'src/app/services/helper/custom-snack-bar.service';
import { HomeService } from 'src/app/services/home.service';

export interface Enquiries {
  id: number;
  name: string;
  email: string;
  college: string;
  phone: string;
  whatsapp: string;
  area: string;
  shiftDate: string;
  refrel: string;
  entryTime: string;
}

@Component({
  selector: 'app-view-form-equiries',
  templateUrl: './view-form-equiries.component.html',
  styleUrls: ['./view-form-equiries.component.css']
})
export class ViewFormEquiriesComponent implements OnInit,AfterViewInit {

  ENQUIRIES_DATA: Enquiries[] = [];
  displayedColumns: string[] = ['action', 'name', 'email', 'college', 'phone', 'whatsapp','area','shiftDate','refrel','entryTime'];
  dataSource = new MatTableDataSource(this.ENQUIRIES_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _snackbarService: CustomSnackBarService, 
    private loader:NgxUiLoaderService,private _admin:HomeService) { }

  ngOnInit(): void {
    this.loadAllEnquiries();
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

  loadAllEnquiries() {
    this.loader.start();
    this._admin.loadAllEnquiries().subscribe(
      (response: any) => {
        if (response.erorr && response.error != '') {
          this._snackbarService.errorSnackBar("Something went wrong!...Please Try Again");
          this.loader.stop();
          return;
        } else {
          let responseData: any = response.data;
          if (responseData) {
            this.ENQUIRIES_DATA = responseData;
            this.dataSource = new MatTableDataSource(this.ENQUIRIES_DATA);
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

  deleteEnquiry(enquiryId:any){
    var self = this;
    let confirm = window.confirm("Are you sure want to delete status of a enquiry ?");
    if(confirm){
      self.loader.start();
      this._admin.deleteEnquiry(enquiryId).subscribe(
        (response: any) => {
          if (response.erorr && response.error != '') {
            this._snackbarService.errorSnackBar("Enquiry deletion failed!...Please Try Again");
            this.loadAllEnquiries();
            this.loader.stop();
            return;
          } else {
            let responseData = response;
            if(responseData.success == 'deleted'){
              this._snackbarService.successSnackBar("Enquiry deleted successfully..");
              this.loadAllEnquiries();
            }
            this.loader.stop();
          }
        },
        (error: any) => {
          this._snackbarService.errorSnackBar("Enquiry deletion failed!...Please Try Again");
          this.loadAllEnquiries();
          this.loader.stop();
          return;
        });
    }
  }

}
