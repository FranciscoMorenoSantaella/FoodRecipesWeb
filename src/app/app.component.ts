import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriesService } from './services/categories.service';
import { CommonModule } from '@angular/common';
import { RecipesService } from './services/recipes.service';
import { RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CarouselComponent, FooterComponent, CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Foodrecipesweb';
  categories:any = []
  recipes:any = []

  iconMap = {
    'SAL': 'Salado',
    'DUL': 'Dulce',
    'PIC': 'Picante',
    'POS': 'Postres',
    'SOP': 'Sopas',
    'ENS': 'Ensaladas',
    'DES': 'Desayunos',
    'RAP': 'Comida rápida',
    'MAR': 'Mariscos',
    'VEG': 'Vegetariano',
    'VGN': 'Vegano',
    'PAS': 'Pastas',
    'CAR': 'Carnes',
    'PES': 'Pescados',
    'BEB': 'Bebidas',
    'BOT': 'Botanas',
    'GUA': 'Guarniciones',
    'INT': 'Comida internacional',
    'PAN': 'Panadería',
    'BAR': 'Barbacoa'
  }

  constructor(private categoriesService:CategoriesService, private recipeService: RecipesService){

  }
  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categorias obtenidas:', this.categories);
      },
      error: (err) => {
        console.error('Error al obtener categorias:', err);
      }
    });

    this.recipeService.getRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
        console.log('Recetas obtenidas:', this.recipes
        );
      },
      error: (err) => {
        console.error('Error al obtener las recetas:', err);
      }
    });
  }
}
