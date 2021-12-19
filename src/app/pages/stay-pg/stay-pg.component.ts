import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private breakpointObserver:BreakpointObserver) { }

  ngOnInit(): void {
  }

}
