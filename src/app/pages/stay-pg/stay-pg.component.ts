import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedService } from 'src/app/services/helper/shared.service';
import { PgService } from 'src/app/services/pg.service';

@Component({
  selector: 'app-stay-pg',
  templateUrl: './stay-pg.component.html',
  styleUrls: ['./stay-pg.component.css']
})
export class StayPgComponent implements OnInit {

  fav:boolean = true;

  pgArray = [
    {heading:"Sri Sai Balaji PG for Men's", location:'Sector-6, HSR Layout', gender:'both', distance:'22km', reviews:'4.5', pgImg:'../../../assets/imgs/stay/pg.jpg',price:'5000'},
    {heading:"Sri Sai Balaji PG for Men's", location:'Sector-6, HSR Layout', gender:'both', distance:'22km', reviews:'4.5', pgImg:'../../../assets/imgs/stay/pg.jpg',price:'5000'},
    {heading:"Sri Sai Balaji PG for Men's", location:'Sector-6, HSR Layout', gender:'both', distance:'22km', reviews:'4.5', pgImg:'../../../assets/imgs/stay/pg.jpg',price:'5000'},
    {heading:"Sri Sai Balaji PG for Men's", location:'Sector-6, HSR Layout', gender:'both', distance:'22km', reviews:'4.5', pgImg:'../../../assets/imgs/stay/pg.jpg',price:'5000'},
    {heading:"Sri Sai Balaji PG for Men's", location:'Sector-6, HSR Layout', gender:'both', distance:'22km', reviews:'4.5', pgImg:'../../../assets/imgs/stay/pg.jpg',price:'5000'},
    {heading:"Sri Sai Balaji PG for Men's", location:'Sector-6, HSR Layout', gender:'both', distance:'22km', reviews:'4.5', pgImg:'../../../assets/imgs/stay/pg.jpg',price:'5000'},
    {heading:"Sri Sai Balaji PG for Men's", location:'Sector-6, HSR Layout', gender:'both', distance:'22km', reviews:'4.5', pgImg:'../../../assets/imgs/stay/pg.jpg',price:'5000'}
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
  );

  constructor(private breakpointObserver:BreakpointObserver, private _shared:SharedService, private _pgService:PgService) { }

  ngOnInit(): void {
    var self = this;
    self.loadPGData(self._shared.sharedData);  
  } 

  private loadPGData(obj:any){
    var self = this;
    // self._pgService.getPGData(obj).subscribe((response:any)=>{
    //   console.log(response);
    // },(error:any)=>{
    //   console.log(error);
    // })
  }

  public toggleFav(){
    var self = this;
    self.fav = self.fav ? false : true;
  }

}
