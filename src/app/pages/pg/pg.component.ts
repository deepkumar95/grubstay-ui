import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
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
    {name:'24x7 Security Serveillance', src:'../../../assets/imgs/amenities/cctv.png'},
    {name:'High-Speed Wifi', src:'../../../assets/imgs/amenities/wifi.png'},
    {name:'Dining Area', src:'../../../assets/imgs/amenities/dining.png'},
    {name:'Delicious Meals', src:'../../../assets/imgs/amenities/meals.png'},
    {name:'Power Backup', src:'../../../assets/imgs/amenities/power.png'},
    {name:'TV', src:'../../../assets/imgs/amenities/tv.png'},
    {name:'Lift', src:'../../../assets/imgs/amenities/lift.png'},
    {name:'Washing Machine', src:'../../../assets/imgs/amenities/washing.png'},
    {name:'Parking Area', src:'../../../assets/imgs/amenities/parking.png'},
    {name:'Water Filter', src:'../../../assets/imgs/amenities/water.png'},
  ]

  pgRoomFac = [
    {name:'Attached Bathroom', src:'../../../assets/imgs/room-facility/bath.png'},
    {name:'Bed With Matress', src:'../../../assets/imgs/room-facility/bed.png'},
    {name:'Ceiling Fan', src:'../../../assets/imgs/room-facility/fans.png'},
    {name:'Hot Water Supply', src:'../../../assets/imgs/room-facility/fans.png'},
    {name:'TV with DTH', src:'../../../assets/imgs/room-facility/tv.png'},
    {name:'Wardrobes', src:'../../../assets/imgs/room-facility/wardrobe.png'},
    {name:'Saftey Lockers', src:'../../../assets/imgs/room-facility/locker.png'},
    {name:'Tables & Chairs', src:'../../../assets/imgs/room-facility/chairs.png'}
  ]

  pgPrices = [
    {name:'Triple Occupency', price:'5000/month'},
    {name:'Double Occupency', price:'6500/month'},
    {name:'Single Occupency', price:'8500/month'}
  ];

  nearbyLandmarks:any = [
    {id:1,title:'Waterfall', src:'../../../assets/imgs/travel-nearby/waterfall.jpg', alt:'waterfall'},
    {id:2,title:'Trekking', src:'../../../assets/imgs/travel-nearby/trekking.jpeg', alt:'trekking'},
    {id:3,title:'Beach', src:'../../../assets/imgs/travel-nearby/beach.jpg', alt:'beach'},
    {id:4,title:'Hill Station', src:'../../../assets/imgs/travel-nearby/hill.jpg', alt:'hill'}
  ];

  pgAbout = 'Situated in a prime location, this house has everything you need. all you need to do is pack your bags and move-in';

  pgGallery = [
    {src:'../../../assets/imgs/pgGal.jpg', alt:'pg'},
    {src:'../../../assets/imgs/pgGal.jpg', alt:'flat'},
    {src:'../../../assets/imgs/pgGal.jpg', alt:'room'},
    {src:'../../../assets/imgs/pgGal.jpg', alt:'wek_stay'}
  ];
  
  carouselOptions: OwlOptions = {
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
  pgCarousel: OwlOptions = {
    items: 1,
    dots: false,
    nav: false,
    loop:true,
  }

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
