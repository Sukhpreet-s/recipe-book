import { Ingredient } from "./Ingredient";

export interface Recipe {
  id?: Number;
  dishName: String;
  recipeInstructions: String;
  ingredients: Ingredient[];
  imagesUrls?: String;
}