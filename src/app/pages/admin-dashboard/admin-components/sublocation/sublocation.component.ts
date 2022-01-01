import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SublocationDialogComponent } from './sublocation-components/sublocation-dialog/sublocation-dialog.component';

export interface SubLocation {
  subLocationId: number;
  subLocationName: string;
  locationId: number;
  locationName: string;
  cityId:number,
  cityName:string,
  operation: string;
  status: string;
  service: string;
  selected: string;
}


@Component({
  selector: 'app-sublocation',
  templateUrl: './sublocation.component.html',
  styleUrls: ['./sublocation.component.css']
})
export class SublocationComponent implements OnInit {

  SUBLOCATION_DATA: SubLocation[]=[];
  columns:string[]=["actions", "position", "cityName", "locationName", "subLocationName", "service"];
  dataSource=new MatTableDataSource(this.SUBLOCATION_DATA);

  constructor(private matDialog:MatDialog) { }

  ngOnInit(): void {
  }
  addSubLocation(){
    this.matDialog.open(SublocationDialogComponent, {
      height:'500px',
      width:'500px'
    });
  }
  filterSubLocation(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
