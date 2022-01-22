import { Component, OnInit } from '@angular/core';
import { filter } from 'minimatch';
import { single } from 'rxjs/operators';

@Component({
  selector: 'filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.css']
})
export class FilterSidebarComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }
  filterUsingOccupency(occcupency:string){
    if(occcupency=='single'){
      console.log('Single Occupency is Clicked!');  
    }
    else if(occcupency=='double'){
      console.log('Double Occupency is Cliced');
    }
    else{
      console.log('Triple Occupency is selected!');
    }
  }
}
