import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { CommonModule } from '@angular/common';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  recipes: any[] = [];
  categoryname:string = "";
  currentPage = 0; // Spring Boot pagination starts at 0
  totalPages = 0;
  pageSize = 6;

  constructor(private recipeService: RecipesService, private route: ActivatedRoute) { } // Inject your service here

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.categoryname = params.get('categoryname')!; 

    }  
    )
    this.loadRecipes();
    console.log("soy las recetas paginadas: " + this.recipes)
  }

  loadRecipes() {
    // Replace this with your actual API call
    this.recipeService.getRecipesByCategoryNamePageable(this.categoryname , this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        this.recipes = response.content;
        this.totalPages = response.totalPages;
        this.currentPage = response.number;
      },
      error: (error: any) => {
        console.error('Error loading recipes:', error);
      }
    });
    console.log("estos son los postres: " + this.recipes)
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadRecipes();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadRecipes();
    }
  }
}
