import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { AbstractControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'models/Ingredient';
import { Recipe } from 'models/Recipe';
import { BackendService } from 'services/backend/backend.service';
import { RecipeService } from 'services/recipe/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  recipeService: RecipeService;

  // Data
  recipeForm: UntypedFormGroup;

  constructor(recipeService: RecipeService, private router: Router) {
    this.recipeService = recipeService;

    this.recipeForm = new UntypedFormGroup({
      dishName: new UntypedFormControl('', [Validators.required, Validators.minLength(4)]),
      ingredients: new UntypedFormArray([], [Validators.required]),
      currentIngredient: new UntypedFormControl(''),
      currentQuantity: new UntypedFormControl(''),
      instructions: new UntypedFormControl('', [Validators.required, Validators.minLength(10)]),
    })
  }

  ngOnInit(): void {}

  // Events

  /**
   * Adds the ingredient name and quantity to ingredient array.
   */
  addIngredient(): void {

    const newIngredientGroup = new UntypedFormGroup({
      name: new UntypedFormControl({ value: this.ingredientName?.value, disabled: true }),
      quantity: new UntypedFormControl({ value: this.ingredientQuantity?.value, disabled: true }),
    });
    
    this.ingredients.push(newIngredientGroup);
    this.ingredientName?.reset();
    this.ingredientQuantity?.reset();
  }

  /**
   * Remove the ingredient from array using the array index.
   * @param index array index
   */
  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  /**
   * Submits the form data.
   * Also, marks the fields as touched so that errors are displayed if trying to submit empty form. 
   */
  handleSubmit(): void {
    this.markFormGroupTouched(this.recipeForm);

    if (this.recipeForm.valid) {
      const { dishName, instructions } = this.recipeForm.value;
      const ingredients: Ingredient[] = this.recipeForm.controls.ingredients.value;

      const recipe: Recipe = {
        dishName,
        ingredients,
        recipeInstruction: instructions
      };

      this.recipeService.add(recipe)
        .subscribe(() => this.router.navigate(['/list-recipes']));
    } 
      
  }

  // get set
  get dishName() { return this.recipeForm.get('dishName'); }
  get ingredientName() { return this.recipeForm.get('currentIngredient'); }
  get ingredientQuantity() { return this.recipeForm.get('currentQuantity'); }
  get ingredients(): UntypedFormArray { return <UntypedFormArray> this.recipeForm.get('ingredients');}
  get instructions() { return this.recipeForm.get('instructions'); }


  /**
   * Marks all controls in a form group as touched
   * Ref: https://stackoverflow.com/questions/40529817/reactive-forms-mark-fields-as-touched
   * @param formGroup - The form group to touch
   */
   private markFormGroupTouched(formGroup: UntypedFormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: AbstractControl) => {
      control.markAsTouched();
    });
  }
    
}
