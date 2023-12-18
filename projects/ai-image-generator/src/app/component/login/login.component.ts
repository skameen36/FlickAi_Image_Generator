import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { find } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm = new FormGroup({
    email : new FormControl("",[Validators.required]),
    password : new FormControl("")
  });

  constructor(private route:Router,private http:HttpClient,private formBuilder:FormBuilder){};

  ngOnInit(): void {
      
      this.loginForm = this.formBuilder.group(
        {
          email:[''],
          password:['']
        }
       )
  }

  login(){
    console.log(this.loginForm);
    this.http.get<any>("http://localhost:3000/signup").subscribe(res=>{
    const user = res.find((a : any)=>{
      return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
    });
    if(user){
      alert('Login Success!..');
      this.loginForm.reset();
      this.route.navigate(['home']);
    }else{
      alert('User Not Found....')
    }
  },err=>{
    alert('Something went wrong')
  }
  )
  }

}
