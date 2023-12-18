import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiUrl = 'https://api.openai.com/v1/images/generations';
  private apiKey = 'YOUR_API_KEY'; 
  
  constructor(private http:HttpClient) { }
  
  GenerateImage(search: string, size: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    let body:any = {
      "model": "dall-e-2",
      "prompt": search,
      "n": size,
      "size": "1024x1024",
      "response_format": "b64_json"
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
