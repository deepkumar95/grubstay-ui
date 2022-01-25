import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-stay-carousel',
  templateUrl: './stay-carousel.component.html',
  styleUrls: ['./stay-carousel.component.css']
})
export class StayCarouselComponent implements OnInit {

  customOptions2: OwlOptions = {
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

  // slidesStore = [
  //   {"id":"location1","alt":"location1","src":"../../../assets/imgs/banglore.png", "title":"Banglore",stayNo:3624},
  //   {"id":"location1","alt":"location1","src":"../../../assets/imgs/banglore.png", "title":"Lucknow",stayNo:2456},
  //   {"id":"location1","alt":"location1","src":"../../../assets/imgs/banglore.png", "title":"Delhi",stayNo:3500},
  //   {"id":"location1","alt":"location1","src":"../../../assets/imgs/banglore.png", "title":"Gujrat",stayNo:1684},
  //   {"id":"location1","alt":"location1","src":"../../../assets/imgs/banglore.png", "title":"Pune",stayNo:2486},
  //   {"id":"location1","alt":"location1","src":"../../../assets/imgs/banglore.png", "title":"Kerla",stayNo:1426}
  // ];

  stayStore:any = [
    {id:1,title:'HSR Layout', src:'../../../assets/imgs/stay/pg.jpg', alt:'pg'},
    {id:2,title:'Koramangala', src:'../../../assets/imgs/stay/room.jpg', alt:'flat'},
    {id:3,title:'HSR Layout', src:'../../../assets/imgs/stay/room.jpg', alt:'room'},
    {id:4,title:'Koramangala', src:'../../../assets/imgs/stay/pg.jpg', alt:'wek_stay'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
