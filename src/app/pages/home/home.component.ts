import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchDialogComponent } from 'src/app/components/search-dialog/search-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
  );

  constructor(private breakpointObserver:BreakpointObserver, public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  public openSearchDialog(){
    const dialogRef = this.dialog.open(SearchDialogComponent,{
      height: '600px',
      width: '500px',
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
