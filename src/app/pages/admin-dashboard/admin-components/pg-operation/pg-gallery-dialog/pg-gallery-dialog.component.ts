import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomSnackBarService } from 'src/app/services/helper/custom-snack-bar.service';
import { PgService } from 'src/app/services/pg.service';
import { PG } from '../pg-operation.component';

@Component({
  selector: 'app-pg-gallery-dialog',
  templateUrl: './pg-gallery-dialog.component.html',
  styleUrls: ['./pg-gallery-dialog.component.css']
})
export class PgGalleryDialogComponent implements OnInit {

  pgId:any;
  pgName:any;
  pgGallery=[];
  public sanitizer;

  constructor(@Inject(MAT_DIALOG_DATA) public data: PG,private _pg:PgService,private _snackBar:CustomSnackBarService, private domSanitier:DomSanitizer) { 
    this.sanitizer=domSanitier;
  }
  ngOnInit(): void {
    this.pgId = this.data.pgId;
    this.pgName = this.data.pgName;
    this.loadPgGallery(this.pgId);
  }

  loadPgGallery(pgId){
    var self = this;
    self._pg.getGalleryByPgId(pgId).subscribe((response:any)=>{
      if(response.error && response.error!=''){
        self._snackBar.errorSnackBar("failed to load pg images...!");
        return;
      }else{
        let responseData = response.data;
        if(responseData.length > 0){
          self.pgGallery = responseData;
        }
        self._snackBar.successSnackBar("Successfully fetched...!");
      }
    },(error)=>{
      self._snackBar.errorSnackBar("failed to load pg images...!");
      return;
    })
  }

}
