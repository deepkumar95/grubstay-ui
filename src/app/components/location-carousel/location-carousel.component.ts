import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-location-carousel',
  templateUrl: './location-carousel.component.html',
  styleUrls: ['./location-carousel.component.css']
})
export class LocationCarouselComponent implements OnInit {

  customOptions: OwlOptions = {
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

  slidesStore = [
    {"id":"location1","alt":"location1","src":"../../../assets/imgs/banglore.png", "title":"Banglore",stayNo:3624},
    {"id":"location1","alt":"location1","src":"../../../assets/imgs/banglore.png", "title":"Lucknow",stayNo:2456},
    {"id":"location1","alt":"location1","src":"../../../assets/imgs/banglore.png", "title":"Delhi",stayNo:3500},
    {"id":"location1","alt":"location1","src":"../../../assets/imgs/banglore.png", "title":"Gujrat",stayNo:1684},
    {"id":"location1","alt":"location1","src":"../../../assets/imgs/banglore.png", "title":"Pune",stayNo:2486},
    {"id":"location1","alt":"location1","src":"../../../assets/imgs/banglore.png", "title":"Kerla",stayNo:1426}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
