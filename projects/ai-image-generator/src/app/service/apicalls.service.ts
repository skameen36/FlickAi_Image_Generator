import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicallsService {

  constructor(private http:HttpClient) { };

  postUser(data: any){
  
    return this.http.post<any>("http://localhost:3000/signup", data)
    .pipe(map((res:any) =>{
        return res;
    }))
  }
}
