import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule}  from '@fortawesome/angular-fontawesome'
import { BehaviourSubjectExampleService } from '../../app/services/behaviour-subject-example.service';
@Component({
  selector: 'app-header',
  imports: [RouterOutlet,FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  userFullName: string = '';
  faUserCircle = faUserCircle;
  router = inject(Router);
  userSub = inject(BehaviourSubjectExampleService)

  constructor(){

  }
ngOnInit(): void {
  
  this.userSub?.userInfoSub$.subscribe((value:any)=> {
    if (value && value.firstName && value.lastName) {
      this.userFullName = `${value.firstName} ${value.lastName}`;
    } else {
      this.userFullName = ''; // or show a fallback like "Guest"
    }
    console.log('User Full Name:', this.userFullName);
  });
}
redirectLogin(){
this.router.navigate(['/login']);
}
redirectStudentReg(){
    this.router.navigate(['/student-registration']);

}
redirectDashBoard(){
  this.router.navigate(['/'])
}
}
