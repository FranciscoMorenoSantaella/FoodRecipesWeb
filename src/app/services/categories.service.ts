import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONSTANTS } from '../config/constants';
import { Recipe } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = `${API_CONSTANTS.baseUrl + API_CONSTANTS.categories}`

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  getCategoryById(id:any): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl + "/" + id);
  }
  
  getCategoryByPage(page:any,size:any){
    return this.http.get<Recipe>(this.apiUrl + "/pageable/" + page + "/" + size)
  }
}
