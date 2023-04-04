import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CityServiceService } from 'src/app/services/city-service.service';
import { CustomSnackBarService } from 'src/app/services/helper/custom-snack-bar.service';
import { SharedService } from 'src/app/services/helper/shared.service';
import { PgService } from 'src/app/services/pg.service';
import { PgGalleryDialogComponent } from './pg-gallery-dialog/pg-gallery-dialog.component';
import { PgOpDialogComponent } from './pg-op-dialog/pg-op-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

export interface PG {
  pgId:string;
  pgName: string;
  pgDesc: string;
  pgAddress: string;
  singleMemPgPrc:string;
  doubleMemPgPrc: string;
  tripleMemPgPrc: string;
  fourMemPgPrc: string;
  operation:string;
  subLocation:object;
}

@Component({
  selector: 'app-pg-operation',
  templateUrl: './pg-operation.component.html',
  styleUrls: ['./pg-operation.component.css']
})
export class PgOperationComponent implements OnInit,AfterViewInit {

  PG_DATA:PG[]=[];
  displayedColumns: string[] = ['actions', 'subLocation', 'pgName', 'pgAddress','singleMemPgPrc','doubleMemPgPrc','tripleMemPgPrc','fourMemPgPrc','service'];
  dataSource = new MatTableDataSource(this.PG_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public sanitizer;

  constructor(private dialog: MatDialog, private _cityService: CityServiceService, 
    private _snackbarService: CustomSnackBarService, private snackBar: MatSnackBar, 
    private domSanitier:DomSanitizer, private _sharedService:SharedService,
    private _pgService:PgService,private loader:NgxUiLoaderService) {
    this.sanitizer=domSanitier;
  }

  ngOnInit(): void {
      var self = this;
      self.loadAllPgData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public editItem(pgId) {
    let pgData=_.find(this.PG_DATA,(item:any)=>{
      return (item.pgId==pgId);
    });
    pgData.operation='edit';
    const dialogRef = this.dialog.open(PgOpDialogComponent, {
      disableClose: true,
      data:pgData
    });
    console.log(pgData);
  }

  public viewGal(pgId){
    let pgData=_.find(this.PG_DATA,(item:any)=>{
      return (item.pgId==pgId);
    });
    const dialogRef = this.dialog.open(PgGalleryDialogComponent, {
      disableClose: true,
      data:pgData
    });
  }

  public deletePg(pgId) {
    let self=this;
    if(pgId){
      let confirm = window.confirm("Are you sure..You want to delete this Record");
      if(confirm){
        self.loader.start();
        self._pgService.deletePgData(pgId).subscribe((response:any)=>{
          if(response.error && response.error != ''){
            self._snackbarService.errorSnackBar("deletion failed...try again!");
            self.loader.stop();
            return;
          }else{
            //self._snackbarService.successSnackBar("Delted Successfully...");
            self._sharedService.redirectTo("/admin/pg");
          }
          self.loader.stop();
        },(error:any)=>{
          self._snackbarService.errorSnackBar("deletion failed...try again!");
          self.loader.stop();
          return;
        })
      }else{
        self._snackbarService.errorSnackBar("deletion failed...try again!");
        self.loader.stop();
          return;
      }
    }
  }
  openPgDialog() {
    const dialogRef = this.dialog.open(PgOpDialogComponent,{
      disableClose: true
    });
  }

  filterPg(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadAllPgData(){
    var self = this;
    self.loader.start();
    self._pgService.loadAllPGData().subscribe((response:any)=>{
      if(response.error && response.error != ''){
        self._snackbarService.errorSnackBar("Couldn't fetch pg datas !");
        self.loader.stop();
        return;
      }else{
        let responseData:any = response.data;
          if (responseData) {
            responseData.forEach(element => {
              if(element.status==true){
                element.service='Active';
              }
              if(element.status==false){
                element.service='Inactive'
              }
            });
          }
          self.PG_DATA = responseData;
          self.dataSource = new MatTableDataSource(this.PG_DATA);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          self.loader.stop();
      }
    },(error:any)=>{
      self._snackbarService.errorSnackBar("Couldn't fetch pg datas !");
      self.loader.stop();
      return;
    })
  }

}
