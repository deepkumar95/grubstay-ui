import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PgService } from '../../services/pg.service';
import { CustomSnackBarService } from '../../services/helper/custom-snack-bar.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HostListener} from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SharedService } from 'src/app/services/helper/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { LoginDialogComponent } from 'src/app/components/login-dialog/login-dialog.component';


declare var Razorpay: any;
export interface PG {
  pgId: string,
  pgName: string,
  pgAddress: string,
  pgSingleMemberPrice: number,
  pgSinglePriceAvail: boolean,
  pgDoubleMemberPrice: number,
  pgDoublePriceAvail: boolean,
  pgTripleMemberPrice: number,
  pgTriplePriceAvail: boolean,
  pgFourMemberPrice: number,
  pgFourPriceAvail: boolean,
  pgAbout: string,
  pgGender: string,
  pgPrice: number
}

interface Amenities {
  SecurityServeillance: boolean,
  SpeedWifi: boolean,
  DiningArea: boolean,
  DeliciousMeals: boolean,
  PowerBackup: boolean,
  TV: boolean,
  Lift: boolean,
  WashingMachine: boolean,
  ParkingArea: boolean,
  Waterfilter: boolean
}
interface Facilities {
  name: string,
  status: boolean
}
interface LandMark {
  id: number,
  str: string,
  alt: string,
  title: string
}

@Component({
  selector: 'app-pg',
  templateUrl: './pg.component.html',
  styleUrls: ['./pg.component.css']
})
export class PgComponent implements OnInit {
  @ViewChild('drawer') drawer : MatDrawer;

  pgId: any;
  fav: boolean = true;
  whatsappLink: any = '';
  minDate = moment(new Date()).format("YYYY-MM-DD");
  maxDate = moment(new Date()).add(5, "days").format("YYYY-MM-DD");
  reserve: any = {
    fullName: "",
    phoneNo: "",
    email: "",
    bookingDate: "",
    reserveDate: "",
    sharingType: "",
    pgName: "",
    pgId: "",
    username: ""
  };



  pgDetails: PG = {
    pgId: '',
    pgName: '',
    pgAddress: '',
    pgSingleMemberPrice: 0,
    pgSinglePriceAvail: false,
    pgDoubleMemberPrice: 0,
    pgDoublePriceAvail: false,
    pgTripleMemberPrice: 0,
    pgTriplePriceAvail: false,
    pgFourMemberPrice: 0,
    pgFourPriceAvail: false,
    pgAbout: '',
    pgGender: '',
    pgPrice: 0
  }

  amenitiesData: Amenities[] = [];
  facilitiesData: Facilities[] = [];

  pgAmen = [
    { dbName: 'securitySurvialance', name: '24x7 Security Serveillance', src: '../../../assets/imgs/amenities/cctv.png' },
    { dbName: 'wifi', name: 'High-Speed Wifi', src: '../../../assets/imgs/amenities/wifi.png' },
    { dbName: 'diningArea', name: 'Dining Area', src: '../../../assets/imgs/amenities/dining.png' },
    { dbName: 'meals', name: 'Delicious Meals', src: '../../../assets/imgs/amenities/meals.png' },
    { dbName: 'powerBackUp', name: 'Power Backup', src: '../../../assets/imgs/amenities/power.png' },
    { dbName: 'tv', name: 'TV', src: '../../../assets/imgs/amenities/tv.png' },
    { dbName: 'lift', name: 'Lift', src: '../../../assets/imgs/amenities/lift.png' },
    { dbName: 'washingMachine', name: 'Washing Machine', src: '../../../assets/imgs/amenities/washing.png' },
    { dbName: 'parkingArea', name: 'Parking Area', src: '../../../assets/imgs/amenities/parking.png' },
    { dbName: 'waterFilter', name: 'Water Filter', src: '../../../assets/imgs/amenities/water.png' },
  ]


  pgRoomFac = [
    { dbName: 'attachedWashroom', name: 'Attached Bathroom', src: '../../../assets/imgs/room-facility/bath.png' },
    { dbName: 'bedWithMattress', name: 'Bed With Matress', src: '../../../assets/imgs/room-facility/bed.png' },
    { dbName: 'ceilingFan', name: 'Ceiling Fan', src: '../../../assets/imgs/room-facility/fans.png' },
    { dbName: 'hotWatersupply', name: 'Hot Water Supply', src: '../../../assets/imgs/room-facility/hotwater.png' },
    { dbName: 'tvDth', name: 'TV with DTH', src: '../../../assets/imgs/room-facility/tv.png' },
    { dbName: 'wardrobe', name: 'Wardrobes', src: '../../../assets/imgs/room-facility/wardrobe.png' },
    { dbName: 'safetyLocker', name: 'Saftey Lockers', src: '../../../assets/imgs/room-facility/locker.png' },
    { dbName: 'tableChair', name: 'Tables & Chairs', src: '../../../assets/imgs/room-facility/chairs.png' }
  ]

  pgPrices = [
    { name: 'Triple Occupency', price: '5000/month' },
    { name: 'Double Occupency', price: '6500/month' },
    { name: 'Single Occupency', price: '8500/month' }
  ];

  nearbyLandmarks: LandMark[] = [];

  pgAbout = 'Situated in a prime location, this house has everything you need. all you need to do is pack your bags and move-in';

  pgGallery: any = [];

  carouselOptions: OwlOptions = {
    loop: true,
    margin: 20,
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
    dots: true,
    nav: false,
    loop: true,
    autoplay: true,
    navSpeed: 700,
    touchDrag: true,
    mouseDrag: true,
    pullDrag: true,
  }
  sanitizer;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private dialog:MatDialog,private breakpointObserver: BreakpointObserver, private _route: ActivatedRoute, private _pgService: PgService, private _snackBarService: CustomSnackBarService, private _sanitizer: DomSanitizer, private title: Title,private loader: NgxUiLoaderService,private _login:LoginService,private _shared:SharedService) {
    this.sanitizer = _sanitizer;
    this.setTitle('Grubstay - Paying Guest');
  }

  options:any = {
    "key": "", // Enter the Key ID generated from the Dashboard
    "amount": "", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Grubstay",
    "description": "https://grubstay.com/",
    "image": "data:image/png;base64,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",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
      let event = new CustomEvent("payment.success", 
          {
              detail: response,
              bubbles: true,
              cancelable: true
          }
      );    
      window.dispatchEvent(event);
    },
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "modal": {
      // We should prevent closing of the form when esc key is pressed.
      escape: false,
      confirm_close:true
    },
    "notes": {
      "address": "Grubstay Corporate Office (more info on : https://grubstay.com/)"
    },
    "theme": {
      "color": "#202020"
    }
  };

  ngOnInit(): void {
    var self = this
    let data: any = {};
    let params: any = this._route.snapshot.params;
    this.whatsappLink = 'grubstay.com/pg/' + params.cityName + '/' + params.locationName + '/' + params.subLocationName + '/' + params.pgName;
    data.cityName = params.cityName.split('-').join(' ').toUpperCase();
    data.locationName = params.locationName.split('-').join(' ').toUpperCase();
    data.subLocationName = params.subLocationName.split('-').join(' ').toUpperCase();
    data.pgName = params.pgName.split('-').join(' ').toUpperCase();
    if (data) {
      this.loadPgData(data);
      this.loadPgGallery(data);
      this.loadLandMark(data);
    }
    console.log(this.minDate);
    console.log(this.maxDate);
  }

  public loadPgData(pgId) {
    this._pgService.loadPgData(pgId).subscribe((response: any) => {
      if (response.error && response.error != '') {
        this._snackBarService.errorSnackBar("Something went wrong");
        return;
      }
      else {
        let responseData = response.data;
        if (responseData) {
          let pgData = responseData[0];
          let amenitiesData: any = responseData[0].amenitiesServices;
          let facilityData: any = responseData[0].roomFacility;
          if (pgData) {
            this.pgDetails.pgId = pgData.pgId;
            this.pgDetails.pgName = pgData.pgName;
            this.pgDetails.pgAddress = pgData.pgAddress;
            this.pgDetails.pgAbout = pgData.pgDesc;
            this.pgDetails.pgGender = pgData.pgGender;
            this.pgDetails.pgPrice = (pgData.singleMemPgPrc && pgData.singleMemPgPrc != 0) ? pgData.singleMemPgPrc : (pgData.doubleMemPgPrc && pgData.doubleMemPgPrc != 0) ? pgData.doubleMemPgPrc : pgData.tripleMemPgPrc;
            if (pgData.singleMemPgPrc && pgData.singleMemPgPrc != 0) {
              this.pgDetails.pgSingleMemberPrice = pgData.singleMemPgPrc;
              this.pgDetails.pgSinglePriceAvail = true;
            }
            if (pgData.doubleMemPgPrc && pgData.doubleMemPgPrc != 0) {
              this.pgDetails.pgDoubleMemberPrice = pgData.doubleMemPgPrc;
              this.pgDetails.pgDoublePriceAvail = true;
            }
            if (pgData.tripleMemPgPrc && pgData.tripleMemPgPrc != 0) {
              this.pgDetails.pgTripleMemberPrice = pgData.tripleMemPgPrc;
              this.pgDetails.pgTriplePriceAvail = true;
            }
            if (pgData.fourMemPgPrc && pgData.fourMemPgPrc != 0) {
              this.pgDetails.pgFourMemberPrice = pgData.fourMemPgPrc;
              this.pgDetails.pgFourPriceAvail = true;
            }
          }
          if (amenitiesData) {
            let tempAmen = [];
            let amenKeys = Object.entries(amenitiesData).filter(([, v]) => v == true).map(([k]) => k);
            this.pgAmen.forEach(obj => {
              let dbName = obj.dbName;
              amenKeys.forEach(obj1 => {
                if (obj1 == dbName) {
                  tempAmen.push(obj);
                }
              })
            });
            this.pgAmen = tempAmen;
          }
          if (facilityData) {
            let tempFac = [];
            let facKeys = Object.entries(facilityData).filter(([, v]) => v == true).map(([k]) => k);
            this.pgRoomFac.forEach(obj => {
              let dbName = obj.dbName;
              facKeys.forEach(obj1 => {
                if (obj1 == dbName) {
                  tempFac.push(obj);
                }
              })
            });
            this.pgRoomFac = tempFac;
          }
        }
        else {
          this._snackBarService.errorSnackBar("PG Not found!");
          return;
        }
      }
    },
      (error) => {
        this._snackBarService.errorSnackBar("Something went wrong!");
      });
  }
  loadPgGallery(data) {
    var self = this;
    self._pgService.getGalleryByPgId(data).subscribe((response: any) => {
      if (response.error && response.error != '') {
        self._snackBarService.errorSnackBar("failed to load pg images...!");
        return;
      } else {
        let responseData: any = response.data;
        if (responseData.length > 0) {
          self.pgGallery = responseData;
        }
      }
    }, (error) => {
      self._snackBarService.errorSnackBar("failed to load pg images...!");
      return;
    })
  }
  loadLandMark(data) {
    this._pgService.loadLandMark(data).subscribe((response: any) => {
      if (response.error && response.error != '') {
        this._snackBarService.errorSnackBar("Something went wrong!");
        return;
      }
      else {
        let total = response.total;
        if (total > 0) {
          let responseData: any = response.data;
          if (responseData) {
            responseData.forEach(obj => {
              let landMarkObj: any = {};
              if (obj.landMarkImageName && obj.landMarkImageName != '') {
                landMarkObj.id = obj.landMarkId;
                landMarkObj.src = obj.landMarkImage;
                landMarkObj.alt = obj.landMarkImageName;
                landMarkObj.title = obj.landMarkName;
                this.nearbyLandmarks.push(landMarkObj);
              }
            });
          }
        }
      }
    },
      (error) => {
        this._snackBarService.errorSnackBar("Something went wrong!");
      })
  }
  public toggleFav() {
    var self = this;
    self.fav = self.fav ? false : true;
  }

  public sharePg() {
    var self = this;
  }

  public setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

  public focusReservePg() {
    var elem = document.getElementById("reservePg");
    elem.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  public reservePg() {
    let user = this._login.getUser();
    if(user.username=='GUEST'){
      this._snackBarService.errorSnackBar("Please login to your account first!");
      this.openLoginDialog();
      return;
    }
    if (this.reserve.fullName && this.reserve.email && this.reserve.phoneNo && this.reserve.sharingType
      && this.reserve.reserveDate) {
      if (this.reserve.phoneNo.toString().length != "10") {
        this._snackBarService.errorSnackBar("Mobile number must be of 10 digit!");
        return;
      }
      this.reserve.pgName = this.pgDetails.pgName;
      this.reserve.pgId = this.pgDetails.pgId;
      this.reserve.bookingDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      this.reserve.username = user.username;
      this.loader.start();
      this._pgService.reservePgNow(this.reserve).subscribe((response: any) => {
        if (response.error && response.error != '') {
          this._snackBarService.errorSnackBar(response.error);
          this.loader.stop();
          return;
        }
        else {
          this.loader.stop();
          let total = response.total;
          if (total > 0) {
            let responseData: any = JSON.parse(response.data[0]);
            let razorPayKey = response.data[1];
            if (responseData) {
              if (responseData.status == 'created' || responseData.status == 'CREATED') {
                // we will open razorpay form
                this.options.key = razorPayKey;
                this.options.order_id = responseData.id;
                this.options.amount = responseData.amount; //paise
                this.options.prefill.name = this.reserve.fullName;
                this.options.prefill.email = this.reserve.email;
                this.options.prefill.contact = this.reserve.phoneNo;

                var rzp1 = new Razorpay(this.options);
                rzp1.on('payment.failed', function (response) {
                  console.log(response.error.code);
                  console.log(response.error.description);
                  console.log(response.error.source);
                  console.log(response.error.step);
                  console.log(response.error.reason);
                  console.log(response.error.metadata.order_id);
                  console.log(response.error.metadata.payment_id);
                  this._snackBarService.errorSnackBar("Oops Payment failed !!");
                  let event2 = new CustomEvent("payment.failed", 
                        {
                            detail: response,
                            bubbles: true,
                            cancelable: true
                        }
                    );    
                    window.dispatchEvent(event2);
                });
                rzp1.open();
              }
            }
          }
        }
      },
        (error) => {
          this.loader.stop();
          this._snackBarService.errorSnackBar(error);
        })
    } else {
      this._snackBarService.errorSnackBar("All fields are required!");
      this.loader.stop();
      return;
    }
  }

  @HostListener('window:payment.success', ['$event'])
  public updateBooking(event){
    let data = event.detail;
      //update booking on server with paid status 
      if(data.razorpay_payment_id, data.razorpay_order_id){
        let order:any = {
          order_id:data.razorpay_order_id,
          payment_id:data.razorpay_payment_id,
          status:"PAID"
        }
        this.loader.start();
        this._pgService.updateBooking(order).subscribe((response: any) => {
          if (response.error && response.error != '') {
            this._snackBarService.errorSnackBar("booking updation failed on server");
            this.reserve = {}
            this.loader.stop();
            return;
          }
          else {
            this.loader.stop();
            let total = response.total;
            if (total > 0) {
              let responseData: any = response.data;
              if (responseData) {
                this._snackBarService.successSnackBar("Your booking confirmed...redirecting to summary page");
                  this.reserve = {
                  fullName: "",
                  phoneNo: "",
                  email: "",
                  bookingDate: "",
                  reserveDate: "",
                  sharingType: "",
                  pgName: "",
                  pgId: "",
                  username: ""
                };
                this._shared.redirectTo("my-bookings");
              }
            }
          }
        },
          (error) => {
            this._snackBarService.errorSnackBar("booking updation failed");
            this.loader.stop();
          })
      }
  }

  @HostListener('window:payment.failed', ['$event'])
  public updateWhenFailed(event){
    // update booking on serve with attempted status
    let data = event.detail;
    let order:any = {
      order_id :data.error.metadata.order_id,
      payment_id:data.error.metadata.payment_id,
      status:"FAILED"
    }
    this.loader.start();
      this._pgService.updateBooking(order).subscribe((response: any) => {
        if (response.error && response.error != '') {
          this._snackBarService.errorSnackBar("booking updation failed on server");
          this.loader.stop();
          return;
        }
        else {
          this.loader.stop();
          let total = response.total;
          if (total > 0) {
            let responseData: any = response.data;
            if (responseData) {
              this._snackBarService.errorSnackBar("Payment aborted...booking failed");
              this.reserve = {
                fullName: "",
                phoneNo: "",
                email: "",
                bookingDate: "",
                reserveDate: "",
                sharingType: "",
                pgName: "",
                pgId: "",
                username: ""
              };
            }
          }
        }
      },
        (error) => {
          this._snackBarService.errorSnackBar("booking updation failed on server");
          this.loader.stop();
        })
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '440px',
      height: '500px',
      disableClose: true 
    });
  }
}
