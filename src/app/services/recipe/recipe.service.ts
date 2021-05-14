import { Injectable } from '@angular/core';
import { Recipe } from 'models/Recipe';
import { Observable } from 'rxjs';
import { BackendService } from 'services/backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  backendService: BackendService;
  recipes: Recipe[] = [];


  constructor(backendService: BackendService) {
    this.backendService = backendService;
  }

  /**
   * Get all recipes from the server and set in the state.
   */
  loadAll(): void {
    this.backendService.getAllRecipes()
      .subscribe(recipes => this.recipes = recipes);
  }

  /**
   * Returns list of recipes from state.
   * @returns list of recipes
   */
  getAll(): Recipe[] {
    return this.recipes;
  }

  /**
   * Delete recipe by id. Loads all the recipes again to sync with store.
   * @param recipeId id of the recipe to delete
   */
  deleteById(recipeId: String): void {
    this.backendService.deleteRecipeById(recipeId)
      .subscribe(() => this.loadAll());
  } 

  add(recipe: Recipe): Observable<Recipe> {
    return this.backendService.createRecipe(recipe);
  }
}
