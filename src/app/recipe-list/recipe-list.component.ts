import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-recipe-list',
  standalone:true,
  imports: [RouterModule,CommonModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recipes: any[] = [];
  searchQuery: string = '';
  currentPage = 0; // Spring Boot pagination starts at 0
  totalPages = 0;
  pageSize = 6;

  constructor(private recipeService:RecipesService, private route: ActivatedRoute, private alertService:AlertService) {} // Inject your service here

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'];
      this.fetchRecipes();
    });
    this.fetchRecipes();
  }

  fetchRecipes() {
    
    console.log(this.searchQuery)
    if (this.searchQuery != "" && this.searchQuery != null) {
      this.recipeService.getRecipeByNamePageable(this.searchQuery, this.currentPage, this.pageSize).subscribe({
        next: (response: any) => {
          this.recipes = response.content; // Asigna el contenido de la respuesta (lista de recetas)
          this.totalPages = response.totalPages; // Total de páginas
          this.currentPage = response.number; // Página actual
        },
        error: (error) => {
          this.alertService.showErrorMessage("Error al cargar las recetas paginadas")
          this.currentPage = -1;
        }
      });
    } if(this.searchQuery == "" || this.searchQuery == null) {
      this.recipeService.getRecipeByPage(this.currentPage, this.pageSize).subscribe({
        next: (response: any) => {
          this.recipes = response.content; // Asigna el contenido de la respuesta (lista de recetas)
          this.totalPages = response.totalPages; // Total de páginas
          this.currentPage = response.number; // Página actual
        },
        error: (error) => {
          this.alertService.showErrorMessage("Error al cargar las recetas")
          this.currentPage = -1;
        }
      });
    }
  }
  

  /**loadRecipes() {
    // Replace this with your actual API call
    this.recipeService.getRecipeByPage(this.currentPage, this.pageSize).subscribe({
       next: (response:any) => {
        this.recipes = response.content;
        this.totalPages = response.totalPages;
        this.currentPage = response.number;
      },
      error: (error) => {
        console.error('Error loading recipes:', error);
      }
    });
  }
**/
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchRecipes();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.fetchRecipes();
    }
  }
}
