import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/helper/shared.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  constructor(private _shared:SharedService,private _route:Router,private _login:LoginService) { }

  ngOnInit(): void {
  }

  navigateTo(url:string, title:string){
    this._shared.headerTitleSubject.next(title);
    this._route.navigate([url]);
  }
  logout(){
    this._login.logout();
    window.location.reload();
  }

  newTabHome(){
    window.open('https://grubstay.com/','_blank');
  }

}
