import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'grubstay-ui';
  floatButton = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private breakpointObserver: BreakpointObserver, private _loginService:LoginService) {

  }
  ngOnInit(): void {
    if (location.href.includes('admin')) {
      this.floatButton = false;
    }
    let storedUser: any = localStorage.getItem('user');
    if (storedUser == null) {
      this._loginService.setDefaultUser();
    }
  }
}
