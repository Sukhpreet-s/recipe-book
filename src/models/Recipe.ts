import { Ingredient } from "./Ingredient";

export interface Recipe {
  id?: Number;
  dishName: String;
  recipeInstruction: String;
  ingredients: Ingredient[];
  imagesUrls?: String;
}