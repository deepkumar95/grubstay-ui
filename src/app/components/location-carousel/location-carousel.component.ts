import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CityServiceService } from 'src/app/services/city-service.service';

@Component({
  selector: 'app-location-carousel',
  templateUrl: './location-carousel.component.html',
  styleUrls: ['./location-carousel.component.css']
})
export class LocationCarouselComponent implements OnInit {
  public sanitizer;
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

  slidesStore2 = [
    {"id":"location1","alt":"location1","src":"../../../assets/imgs/city/banglore.jpg", "title":"Banglore",stayNo:3624},
    {"id":"location1","alt":"location1","src":"../../../assets/imgs/city/mumbai.jpg", "title":"Mumbai",stayNo:2456},
    {"id":"location1","alt":"location1","src":"../../../assets/imgs/city/delhi.jpg", "title":"Delhi",stayNo:3500},
    {"id":"location1","alt":"location1","src":"../../../assets/imgs/city/banglore.jpg", "title":"Gujrat",stayNo:1684},
    {"id":"location1","alt":"location1","src":"../../../assets/imgs/city/pune.jpeg", "title":"Pune",stayNo:2486},
    {"id":"location1","alt":"location1","src":"../../../assets/imgs/city/banglore.jpg", "title":"Kerla",stayNo:1426}
  ];

  slidesStore = [];

  constructor(private _city:CityServiceService,private domSanitier:DomSanitizer) {
    this.sanitizer=domSanitier;
   }

  ngOnInit(): void {
    this.loadAllCity();
  }

  loadAllCity(){
    this._city.loadAllCity().subscribe((response:any)=>{
      if(response.error && response.error!=''){
        console.log(response.error);
      }else{
        console.log(response);
        let cities = response.data;
        if(cities.length >= 5){
          cities.forEach(element => {
            let city:any = {};
            city.id = element.cityId;
            city.alt = element.cityImageName;
            city.src = element.cityImage;
            city.title = element.cityName;
            city.status = element.status;
            city.stayNo = element.totalStays;
            if(city.status == true){
              this.slidesStore.push(city);
            }
          });
        }else{
          this.slidesStore = this.slidesStore2;
        }
      }
    },(error:any)=>{
      console.log(error);
    })
  }

}
