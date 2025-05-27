import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout',
  imports: [ReactiveFormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  trainigForm!:FormGroup
   courses = [
    {
      id:1,
      course_name:'Angular',
      course_img:'https://ionic.io/blog/wp-content/uploads/2024/02/angular-feature-image-1-1024x512.png'
    },
     {
      id:2,
      course_name:'Mern Full Stack',
      course_img:'https://ionic.io/blog/wp-content/uploads/2024/02/angular-feature-image-1-1024x512.png'
    },
    {
      id:3,
      course_name:'Java Full Stack',
      course_img:'https://media.geeksforgeeks.org/wp-content/uploads/20230926163338/Java-Full-Stack.png'
    },
    {
      id:4,
      course_name:'React Js',
      course_img:'https://miro.medium.com/v2/resize:fit:1400/1*MF5V_dkybUTcfzwHFh0VSw.jpeg'
    },
     {
      id:5,
      course_name:'UI/UX Designing',
      course_img:'https://careercollegeindia.com/blog/wp-content/uploads/2024/09/UI-UX-Designer-scaled.jpg'
    },
     {
      id:6,
      course_name:'Java',
      course_img:'https://dac.digital/wp-content/uploads/2023/04/backend-java-optimized.png'
    },
    {
      id:7,
      course_name:'Web Development',
      course_img:'https://miro.medium.com/v2/resize:fit:1200/1*V-Jp13LvtVc2IiY2fp4qYw.jpeg'
    },
     {
      id:8,
      course_name:'Node Js',
      course_img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZP8brxJPLalsjKHV6aSDwkM0PHNZ_YLZ78Q&s'
    },
      {
      id:9,
      course_name:'Node Js',
      course_img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZP8brxJPLalsjKHV6aSDwkM0PHNZ_YLZ78Q&s'
    }
   ]
    trainingType = [
      {
        name:'Classroom Training', value:'classroomtrainig'
      },
      {
        name:'Online Training', value:'onlinetrainig'
      },
        {
        name:'Corporate Training', value:'corporatetrainig'
      }
    ]
  constructor(private fb:FormBuilder){

  }

  ngOnInit(): void {
    
    this.trainigForm = this.fb.group({
      trainingValue:[''],
      name:[''],
      phone:[''],
      email:['']
    })

    console.log('courses',this.courses)
  }

  onSubmit(){
   console.log('VALUES',this.trainigForm.value)
  }
}
