import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pg',
  templateUrl: './pg.component.html',
  styleUrls: ['./pg.component.css']
})
export class PgComponent implements OnInit {
  pgId:any;
  fav:boolean = true;

  pgAmen = [
    {name:'24x7 Security Serveillance', src:''},
    {name:'High-Speed Wifi', src:''},
    {name:'Dining Area', src:''},
    {name:'Delicious Meals', src:''},
    {name:'Power Backup', src:''},
    {name:'TV', src:''},
    {name:'Lift', src:''},
    {name:'Washing Machine', src:''},
    {name:'Parking Area', src:''},
    {name:'Water Filter', src:''},
  ]

  pgRoomFac = [
    {name:'Attached Bathroom', src:''},
    {name:'Bed With Matress', src:''},
    {name:'Ceiling Fan', src:''},
    {name:'Hot Water Supply', src:''},
    {name:'TV with DTH', src:''},
    {name:'Wardrobes', src:''},
    {name:'Saftey Lockers', src:''},
    {name:'Tables & Chairs', src:''}
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
  );

  constructor(private breakpointObserver:BreakpointObserver,private _route:ActivatedRoute) { }

  ngOnInit(): void {
    var self = this;
  }

  public toggleFav(){
    var self = this;
    self.fav = self.fav ? false : true;
  }

  public sharePg(){
    var self = this;
  }

}
