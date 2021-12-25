import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/helper/shared.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  constructor(private _shared:SharedService,private _route:Router) { }

  ngOnInit(): void {
  }

  navigateTo(url:string, title:string){
    this._shared.headerTitleSubject.next(title);
    this._route.navigate([url]);
  }

}
