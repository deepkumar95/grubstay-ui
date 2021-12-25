import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public headerTitleSubject = new Subject<String>();

  public sharedData:any = {}

  constructor() { }
}
