import { CategoriesService } from '../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  categories: any[] = [];
  currentPage = 0; // Spring Boot pagination starts at 0
  totalPages = 0;
  pageSize = 6;

  constructor(private categoryService:CategoriesService) {} // Inject your service here

  ngOnInit() {
   this.loadRecipes();
   console.log("soy las recetas paginadas: " + this.categories)
  }

  loadRecipes() {
    // Replace this with your actual API call
    this.categoryService.getCategoryByPage(this.currentPage, this.pageSize).subscribe({
       next: (response:any) => {
        this.categories = response.content;
        this.totalPages = response.totalPages;
        this.currentPage = response.number;
      },
      error: (error) => {
        console.error('Error loading recipes:', error);
      }
    });
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
