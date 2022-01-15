import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { CustomSnackBarService } from 'src/app/services/helper/custom-snack-bar.service';
import { AdminDialogComponent } from './admin-dialog/admin-dialog.component';



export interface User {
  userId:string;
  username: string;
  email: string;
  firstName: string;
  lastName:string;
  gender: string;
  phone: string;
  whatsapp:string;
  dob:string;
  role:string;
}

@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.css']
})
export class SubAdminComponent implements OnInit {

  USER_DATA:User[]=[];
  displayedColumns: string[] = ['actions', 'username', 'email', 'phone','gender','firstName','lastName','dob','role'];
  dataSource = new MatTableDataSource(this.USER_DATA);

  constructor(private _snackBar:CustomSnackBarService, private dialog:MatDialog) { }

  ngOnInit(): void {
    var self = this;
    self.loadAllAdmins();
  }

  public editItem(userId) {
    let userData=_.find(this.USER_DATA,(item:any)=>{
      return (item.userId==userId);
    });
    userData.operation='edit';
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      disableClose: true,
      data:userData
    });
    console.log(userData);
  }

  public deletePg(userId) {
    let self=this;
    if(userId){
      let confirm = window.confirm("Are you sure..You want to delete this Record");
      if(confirm){
        
      }else{
        self._snackBar.errorSnackBar("deletion failed...try again!");
          return;
      }
    }
  }
  openPgDialog() {
    const dialogRef = this.dialog.open(AdminDialogComponent,{
      disableClose: true
    });
  }

  filterAdmin(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadAllAdmins(){
    var self = this;
  }
}
