import { Ingredient } from "./Ingredient";

export interface Recipe {
  id?: String;
  dishName: String;
  recipeInstruction: String;
  ingredients: Ingredient[];
  imagesUrls?: String;
}