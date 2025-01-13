import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { CarouselComponent } from '../carousel/carousel.component';
import { RecipesService } from '../services/recipes.service';
import { CategoriesService } from '../services/categories.service';
import { AlertService } from '../services/alert.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CarouselComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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

  constructor(private categoriesService:CategoriesService, private recipeService: RecipesService, private alertService: AlertService){

  }
  ngOnInit(): void {
   
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categorias obtenidas:', this.categories);
      },
      error: (err) => {
        this.alertService.showErrorMessage("Error al cargar las categorias")
      }
    });

    this.recipeService.getRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
        console.log('Recetas obtenidas:', this.recipes);
      },
      error: (err) => {
        this.alertService.showErrorMessage("Error al cargar las categorias")
      }
    });
  }
}
