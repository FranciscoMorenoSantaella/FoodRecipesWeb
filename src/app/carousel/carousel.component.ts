import { Component } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../services/categories.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-carousel',
  imports: [CommonModule,RouterLink],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  recipes:any = [];
  categories:any = [];
  constructor(private recipeService: RecipesService, private categoriesService:CategoriesService) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
        console.log('Recetas obtenidas:', this.recipes);
      },
      error: (err) => {
        console.error('Error al obtener recetas:', err);
      }
    });
  }
}
