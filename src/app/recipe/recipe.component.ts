import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { CommonModule } from '@angular/common';
import { AlertService } from '../services/alert.service';
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
  constructor(private route: ActivatedRoute, private recipeService: RecipesService,private alertService:AlertService) { }

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
          this.alertService.showErrorMessage("Error al cargar la receta")
        }
      });
    }   // Aquí puedes cargar la receta con el ID
    )
  }
}

