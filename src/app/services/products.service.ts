import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient)
  constructor() { }

  getproductList(){
    const URL = 'https://dummyjson.com/products';
    return this.http.get(URL);
  }
}
