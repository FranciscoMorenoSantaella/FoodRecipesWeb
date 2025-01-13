import { CategoriesService } from '../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { AlertService } from '../services/alert.service';

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

  constructor(private categoryService:CategoriesService, private alertService:AlertService) {} // Inject your service here

  ngOnInit() {
   this.loadCategories();
   console.log("soy las recetas paginadas: " + this.categories)
  }

  loadCategories() {
    // Replace this with your actual API call
    this.categoryService.getCategoryByPage(this.currentPage, this.pageSize).subscribe({
       next: (response:any) => {
        this.categories = response.content;
        this.totalPages = response.totalPages;
        this.currentPage = response.number;
      },
      error: (error) => {
        this.alertService.showErrorMessage("Error al cargar las categorias")
        this.currentPage = -1;
      }
    });
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadCategories();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadCategories();
    }
  }
}
