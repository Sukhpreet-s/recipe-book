import { Component, OnInit } from '@angular/core';
import { Recipe } from 'models/Recipe';
import { RecipeService } from 'services/recipe/recipe.service';

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.scss']
})
export class ListRecipesComponent implements OnInit {
  recipeService: RecipeService;

  constructor(recipeService: RecipeService) {
    this.recipeService = recipeService;
   }

  ngOnInit(): void {
    // fetch data from api    
    this.recipeService.loadAll();
  }

  // Getters
  get recipeList() {
    return this.recipeService.getAll();
  }

  // Event handlers
  deleteRecipe(recipe: Recipe): void {
    if (recipe.id) {
      this.recipeService.deleteById(recipe.id);
    } else {
      console.log("Error while removing")
    }
  }

}
