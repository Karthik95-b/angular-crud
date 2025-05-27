import { Component, inject, OnInit, signal } from '@angular/core';
import { LoginComponent } from "../components/login/login.component";
import { TestingService } from './testing.service';
import {faPen,faTrash}  from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeModule}  from '@fortawesome/angular-fontawesome'
import e from 'express';
import { HeaderComponent } from "../components/header/header.component";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [LoginComponent, FontAwesomeModule, HeaderComponent,RouterOutlet],
  providers:[],
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'angular19';
  faPen = faPen;
  faTrash = faTrash;

  storeUserInformation = signal<any>([]);
  testingServ = inject(TestingService);
  storeEditUserInformation = signal<any>(null);
  constructor(){

  }
  ngOnInit(): void {


    this.testingServ.getFormValue.subscribe({
      next:(res:any)=>{
          console.log('res',res)
          this.storeUserInformation.set(res);
      }
    })
  }
  onEdit(element:any){
    this.testingServ.setUserInfo(element)
    // this.storeEditUserInformation.set(element)
  }
  onDelete(element:any){
    const current = this.storeUserInformation();
    console.log('current',current)
    const updated = current.filter((user:any) =>
      user.phoneNo !== element.phoneNo || user.firstName !== element.firstName || user.lastName !== element.lastName
    );
    this.storeUserInformation.set(updated);
  }


  // getAllReceips(){
  //   this.testingServ.getProducts().subscribe({
  //     next:(res:any)=>{
  //     },
  //     error:(err)=> {
  //       console.log('Err',err)
  //     },
  //     complete:()=>{
  //       console.log('API is COmpleted')
  //     }
  //   })
  // }
  // getProducts(){
  //   this.productServ.getproductList().subscribe({
  //     next:(res:any) => {
  //       console.log('res',res)
  //     },
  //     error:(error:any)=>{
  //       console.log('err',error)
  //     },
  //     complete:()=>{
  //       console.warn('API CALL COMPLETED')
  //     }
  //   })
  // }
}
