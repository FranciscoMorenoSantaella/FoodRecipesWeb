import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-recipe',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  recipeId: number | null = null;
  recipe: any;
  constructor(private route: ActivatedRoute, private recipeService: RecipesService) { }

  ngOnInit(): void {
    // Obtiene el parámetro 'id' de la URL
    this.route.paramMap.subscribe(params => {
      this.recipeId = +params.get('id')!;  // El signo '+' convierte el id a número
      console.log('Receta ID:', this.recipeId);
      this.recipeService.getRecipeById(this.recipeId).subscribe({
        next: (data) => {
          this.recipe = data;
          console.log('Recetas obtenidas:', this.recipe
          );
        },
        error: (err) => {
          console.error('Error al obtener las recetas:', err);
        }
      });
    }   // Aquí puedes cargar la receta con el ID
    )
  }
}

