import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { CustomSnackBarService } from 'src/app/services/helper/custom-snack-bar.service';
import { AdminDialogComponent } from './admin-dialog/admin-dialog.component';
import { UserServiceService } from '../../../../services/user-service.service';
import { SharedService } from '../../../../services/helper/shared.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';


export interface User {
  userId: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  whatsapp: string;
  dob: string;
  roles: string;
  operation: string;
}

@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.css']
})
export class SubAdminComponent implements OnInit,AfterViewInit {

  USER_DATA: User[] = [];
  displayedColumns: string[] = ['actions', 'username', 'email', 'phone', 'gender', 'firstName', 'lastName', 'dob', 'roles'];
  dataSource = new MatTableDataSource(this.USER_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _snackBar: CustomSnackBarService, private dialog: MatDialog, private userService: UserServiceService, private _sharedService:SharedService) { }

  ngOnInit(): void {
    var self = this;
    self.loadAllAdmins();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public editItem(userId) {
    let userData = _.find(this.USER_DATA, (item: any) => {
      return (item.userId == userId);
    });
    userData.operation = 'edit';
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      disableClose: true,
      height: "600px",
      width: "520px",
      data: userData
    });
    console.log(userData);
  }

  public deletePg(userId) {
    let self = this;
    if (userId) {
      let confirm = window.confirm("Are you sure..You want to delete this Record");
      if (confirm) {
        this.userService.deleteAdmin(userId).subscribe((response: any) => {
          if (response.error && response.error != '') {
            this._snackBar.errorSnackBar("Somethign went wrong");
            return;
          }
          else{
            let deleteStatus=response.success;
            if(deleteStatus=='Deleted'){
              this._snackBar.successSnackBar("User Deleted Successfully!");
              this._sharedService.redirectTo("/admin/sub-admin");
            }else{
              this._snackBar.errorSnackBar("Deletion Failed!");
              return;
            }
          }
        },
          (error: any) => {
            this._snackBar.errorSnackBar("Somethign went wrong");
            return;
          })
      } else {
        self._snackBar.errorSnackBar("deletion failed...try again!");
        return;
      }
    }
  }
  openPgDialog() {
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      height: "600px",
      width: "520px",
      disableClose: true
    });
  }

  filterAdmin(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadAllAdmins() {
    var self = this;
    self.userService.loadAllAdmin().subscribe((response: any) => {
      if (response.error && response.error != '') {
        this._snackBar.errorSnackBar("Something went wrong!");
        return;
      }
      else {
        let fetchStatus = response.success;
        if (fetchStatus == 'fetched') {
          let responseData: any = response.data;
          responseData.forEach(element => {
            this.USER_DATA.push(element);
          });
          this.dataSource = new MatTableDataSource(this.USER_DATA);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else {
          this._snackBar.errorSnackBar("No Record Found!");
          return;
        }
      }
    },
      (error: any) => {
        this._snackBar.errorSnackBar("Something went wrong!");
      });
  }
}
