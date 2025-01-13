import { Routes } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },  // Redirige a /home
    { path: 'home', component: HomeComponent },  // Ruta para /home, asignada a AppComponent
    { path: 'receta/:id', component: RecipeComponent },
    { path: 'recetas', component: RecipeListComponent },
    { path: 'categorias', component: CategoryListComponent },
    { path: 'categoria/:categoryname', component: CategoryComponent },
    { path: '**', component: PagenotfoundComponent }
];
