import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/helper/shared.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  headerTitle:any = 'All Details';
  
  constructor(public _shared:SharedService) { }

  ngOnInit(): void {
    this._shared.headerTitleSubject.asObservable().subscribe(data=>{
      this.headerTitle = data;
    })
  }

}
