import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviourSubjectExampleService {

  userInfoSub$ = new BehaviorSubject<any>('');
  storeUserInfo$ = this.userInfoSub$.asObservable();
  constructor() { }

  storeUserInfo(formValues:any){
    this.userInfoSub$.next(formValues);
  }
}
