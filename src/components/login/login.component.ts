import { animate, style, transition, trigger } from '@angular/animations';
import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import { TestingService } from '../../app/testing.service';
import { ProductsService } from '../../app/services/products.service';
import { CommonModule } from '@angular/common';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar'
import { ActivatedRoute, NavigationStart, Router,Event } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule,MatSnackBarModule],
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
    snackBar = inject(MatSnackBar)
    private title = inject(Title);
private route = inject(ActivatedRoute);   // For accessing route info
      pageTitle: string = '';

    @Input() selectedUser: any;

     constructor(private fb:FormBuilder,private router:Router){
    this.router?.events?.subscribe((event: Event) => {
        if(event instanceof NavigationStart){
          // console.log('Navigation Started To',event?.url)
        }
       })
   
     }
  ngOnInit(): void {

    console.log('selectedUser on init:', this.selectedUser);
    this.testingServ.selectedUser$.subscribe((res:any)=>{
      if(res){
        this.userInfo.patchValue(res)
      }
    })
    this.initForm();
    // this.updateFormValues();

    setTimeout(() => {
      this.showForm = true;
    });

    // console.log(this.title.getTitle())
    this.route?.data?.subscribe((value:any)=>{
      this.pageTitle = value['title'];
      console.log('pageTitle',this.pageTitle)
    })

    console.log('eve',this.router)
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
    if(this.userInfo.invalid){
      console.log()
    }
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
    this.snackBar.open('User registred successfully!!','close',{
      duration:3000,
      horizontalPosition:'right',
      verticalPosition:'top'
    })
    
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['selectedUser']) {
  //     console.log('selectedUser changed:', changes['selectedUser'].currentValue);
  //     let res = changes['selectedUser'].currentValue
  //     this.userInfo.patchValue(res)

  //   }
  // }

}
