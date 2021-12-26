import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { LocationDialogComponent } from './location-components/location-dialog/location-dialog.component';

export interface Location {
  location_id:number;
  location_name: string;
  location_pic: string;
  position: number;
}

const LOCATION_DATA: Location[] = [
  {location_id: 1, location_name: 'Hydrogen',location_pic:'test', position:1},
  {location_id: 2, location_name: 'Hydrogen',location_pic:'test', position:2},
  {location_id: 3, location_name: 'Hydrogen',location_pic:'test', position:3},
  {location_id: 4, location_name: 'Hydrogen',location_pic:'test', position:4},
  {location_id: 5, location_name: 'Hydrogen',location_pic:'test', position:5},
  {location_id: 6, location_name: 'Hydrogen',location_pic:'test', position:6},
  {location_id: 7, location_name: 'Hydrogen',location_pic:'test', position:7},
  {location_id: 8, location_name: 'Hydrogen',location_pic:'test', position:8},
  {location_id: 9, location_name: 'Hydrogen',location_pic:'test', position:9},
  {location_id: 10, location_name: 'Hydrogen',location_pic:'test', position:10},
  {location_id: 11, location_name: 'Hydrogen',location_pic:'test', position:11},
  {location_id: 12, location_name: 'Hydrogen',location_pic:'test', position:12},
  {location_id: 13, location_name: 'Hydrogen',location_pic:'test', position:13},
  {location_id: 14, location_name: 'Hydrogen',location_pic:'test', position:14},
  {location_id: 15, location_name: 'Hydrogen',location_pic:'test', position:15},
  {location_id: 16, location_name: 'Hydrogen',location_pic:'test', position:16}
];

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})


export class LocationComponent implements OnInit {

  displayedColumns: string[] = ['actions','position', 'location_name', 'location_pic'];
  dataSource = new MatTableDataSource(LOCATION_DATA);

  constructor(private matDialog:MatDialog) { }

  ngOnInit(): void {
  }
  public editItem(position){
    alert(position+" Clicked");
  }

  public deleteItem(position){
    alert(position+" Clicked");
  }
  
  filterLocation(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openLocationDialog(){
    const dialogRef = this.matDialog.open(LocationDialogComponent, {
      width: '500px',
      height: '500px'
    });
  }

}
