import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

 constructor(private formBuilder:FormBuilder, private http:HttpClient, private router:Router){};

 signupForm !: FormGroup;

 ngOnInit(): void {
     this.signupForm = this.formBuilder.group(
      {
        fullname:[''],
        email:[''],
        password:['']
      }
     )
 }

 sighUp() {
     this.http.post<any>("http://localhost:3000/signup",this.signupForm.value)
     .subscribe(res => {
        alert('SignUp Successfull.....');
        this.signupForm.reset();
        this.router.navigate(['login']);
     },err=>{
      alert('Something went wrong....')
     }
     )
  }
}
