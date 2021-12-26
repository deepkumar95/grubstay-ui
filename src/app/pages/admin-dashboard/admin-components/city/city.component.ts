import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {CityDialogComponent} from '../../admin-components/city/city-components/city-dialog/city-dialog.component';

export interface City {
  city_id:number;
  city_name: string;
  city_pic: string;
  position: number;
}


const CITY_DATA: City[] = [
  {city_id: 1, city_name: 'Hydrogen',city_pic:'test', position:1},
  {city_id: 2, city_name: 'Hydrogen',city_pic:'test', position:2},
  {city_id: 3, city_name: 'Hydrogen',city_pic:'test', position:3},
  {city_id: 4, city_name: 'Hydrogen',city_pic:'test', position:4},
  {city_id: 5, city_name: 'Hydrogen',city_pic:'test', position:5},
  {city_id: 6, city_name: 'Hydrogen',city_pic:'test', position:6},
  {city_id: 7, city_name: 'Hydrogen',city_pic:'test', position:7},
  {city_id: 8, city_name: 'Hydrogen',city_pic:'test', position:8},
  {city_id: 9, city_name: 'Hydrogen',city_pic:'test', position:9},
  {city_id: 10, city_name: 'Hydrogen',city_pic:'test', position:10},
  {city_id: 11, city_name: 'Hydrogen',city_pic:'test', position:11},
  {city_id: 12, city_name: 'Hydrogen',city_pic:'test', position:12},
  {city_id: 13, city_name: 'Hydrogen',city_pic:'test', position:13},
  {city_id: 14, city_name: 'Hydrogen',city_pic:'test', position:14},
  {city_id: 15, city_name: 'Hydrogen',city_pic:'test', position:15}

];

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})


export class CityComponent implements OnInit {

  displayedColumns: string[] = ['actions','position', 'city_pic', 'city_name'];
  dataSource = new MatTableDataSource(CITY_DATA);

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  public editItem(position){
    alert(position+" Clicked");
  }

  public deleteItem(position){
    alert(position+" Clicked");
  }
  openCityDialog(){
    const dialogRef = this.dialog.open(CityDialogComponent, {
      width: '500px',
      height: '500px'
    });
  }

  filterCity(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
