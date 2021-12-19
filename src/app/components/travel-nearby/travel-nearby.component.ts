import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-travel-nearby',
  templateUrl: './travel-nearby.component.html',
  styleUrls: ['./travel-nearby.component.css']
})
export class TravelNearbyComponent implements OnInit {

  customOptions3: OwlOptions = {
    loop: false,
    margin:20,
    // autoWidth:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 3
      },
      740: {
        items: 6
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  travelStore:any = [
    {id:1,title:'Waterfall', src:'../../../assets/imgs/travel-nearby/waterfall.jpg', alt:'waterfall'},
    {id:2,title:'Trekking', src:'../../../assets/imgs/travel-nearby/trekking.jpeg', alt:'trekking'},
    {id:3,title:'Beach', src:'../../../assets/imgs/travel-nearby/beach.jpg', alt:'beach'},
    {id:4,title:'Hill Station', src:'../../../assets/imgs/travel-nearby/hill.jpg', alt:'hill'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
