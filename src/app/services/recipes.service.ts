import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONSTANTS } from '../config/constants';

export interface Recipe {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root' // Provisión global
})
export class RecipesService {
  private apiUrl = `${API_CONSTANTS.baseUrl + API_CONSTANTS.recipes}`

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  getRecipeById(id:any):Observable<Recipe>{
    return this.http.get<Recipe>(this.apiUrl + "/" + id)
  }

  getRecipeByPage(page:any,size:any){
    return this.http.get<Recipe>(this.apiUrl + "/pageable/" + page + "/" + size)
  }

  getRecipesByCategoryNamePageable(categoryname:String, page:any,size:any){
    return this.http.get<Recipe>(this.apiUrl + "/pageable/" + categoryname + "/" + page + "/" + size)
  }

  getRecipeByNamePageable(recipename:String, page:any,size:any){
    return this.http.get<Recipe>(this.apiUrl + "/pageable/" + "name/" + recipename  + "/" + page + "/" + size)
  }
}
