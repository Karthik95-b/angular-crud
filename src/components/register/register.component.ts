import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviourSubjectExampleService } from '../../app/services/behaviour-subject-example.service';
import { ApiService } from '../../app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  stdRegister!:FormGroup
  constructor(
    private fb:FormBuilder,
    private userSub:BehaviourSubjectExampleService,
    private apiService: ApiService,
    private router:Router
  ){

  }
  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.stdRegister = this.fb.group({
      firstName :['',      Validators.required,Validators.minLength(4)],
      lastName:['',Validators.required],
      email:['',Validators.required],
      phno:['',Validators.required],
      dob:['',Validators.required],
      age:['',Validators.required],
      // gender:['',Validators.required]
    })
  }
calculateAge(): void {
  const dobValue = this.stdRegister.get('dob')?.value;
  if (dobValue) {
    const today = new Date();
    const dob = new Date(dobValue);

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dob.getDate())
    ) {
      age--;
    }

    this.stdRegister.get('age')?.setValue(age);
  }
}

  studentRegister(){
    console.log('FORM VALUES==>',this.stdRegister.get('firstName'))
   if(this.stdRegister.invalid){
    console.warn('Please fill all the fields')
   } else {
    console.log('FORM Values',this.stdRegister.value);
    this.userSub?.storeUserInfo(this.stdRegister?.value);
    this.apiService.registerUser(this.stdRegister?.value).subscribe({
      next:(res:any)=>{
        console.log('res',res);
      }
    });
    this.stdRegister.reset();
    setTimeout(() => {
      this.router.navigate(['/dashboard'])
    }, 8000);
   }
  }

  setFormValues(){
    console.log('clciked')
  this.stdRegister.patchValue({
  firstName: 'Karthik',
  lastName: 'Dev',
  email: 'kar@example.com'
});
  }
}
