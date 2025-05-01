import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestingService  implements OnInit{


  http = inject(HttpClient)
  formValue = new BehaviorSubject<any[]>([]);
  getFormValue = this.formValue.asObservable();

  private selectedUserInformation = new BehaviorSubject<any>(null);
  selectedUser$ = this.selectedUserInformation.asObservable();
  constructor() { 
 
  }

  ngOnInit(): void {
    console.log(this.getFormValue)
  }

  setUserInfo(userValues:any){
    this.selectedUserInformation.next(userValues);
  }
  getProducts(){
   return this.http.get(`https://dummyjson.com/products`);
  }
}
