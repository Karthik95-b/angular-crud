import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL = 'http://localhost:3004/users';
  constructor(
    private http:HttpClient
  ) { }

  getAllUsers(){
     return this.http.get(this.URL);
  }
  registerUser(data:any){
    return this.http.post(this.URL,data)
  }
}
