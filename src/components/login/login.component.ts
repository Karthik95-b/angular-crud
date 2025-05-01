import { animate, style, transition, trigger } from '@angular/animations';
import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import { TestingService } from '../../app/testing.service';
import { ProductsService } from '../../app/services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations:[
      trigger('slideFadeIn',[
            transition(':enter',[
              style({opacity:0,transform:'translateY(-50px)'}),
              animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
      ])
    ]
})
export class LoginComponent implements OnInit {

  
    showForm = false;
  
    userInfo! :FormGroup
    testingServ = inject(TestingService);
    productServ = inject(ProductsService)

     constructor(private fb:FormBuilder){
   
     }
  ngOnInit(): void {

    this.testingServ.selectedUser$.subscribe((res:any)=>{
      if(res){
        console.log('USER VALUES',res)
        this.userInfo.patchValue(res)
      }
    })
    this.initForm();
    // this.updateFormValues();

    setTimeout(() => {
      this.showForm = true;
    });


  }

  private initForm(){
    this.userInfo = this.fb.group(({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      phoneNo:['',Validators.required]
    }))
  }
  private updateFormValues(){
    this.userInfo.patchValue({
      firstName:'Karthik Reddy'
    })
  }
  onSubmit(e:any){
    e.preventDefault();
    console.log('Value first',this.userInfo.value)
    const current = this.testingServ.formValue.getValue();
    console.log('current Value',current)
    const newEntry = {...this.userInfo.value}
    console.log('newEntry',newEntry)
    const avoidDuplicates = current.some(item=>
      item.firstName === newEntry.firstName &&
      item.lastName === newEntry.lastName &&
      item.phoneNo === newEntry.phoneNo
    )
    console.log('avoidDuplicates',avoidDuplicates)
    if(avoidDuplicates){
      console.warn('Duplicate entry, not adding again');
      return;
    }
    this.testingServ.formValue.next([...current,newEntry])
    this.userInfo.reset();
    
  }

}
