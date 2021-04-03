import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'models/Ingredient';
import { BackendService } from 'services/backend/backend.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  backendService: BackendService;

  // Data
  recipeForm: FormGroup;

  constructor(backendService: BackendService, private router: Router) {
    this.backendService = backendService;

    this.recipeForm = new FormGroup({
      dishName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      ingredients: new FormArray([]),
      currentIngredient: new FormControl('', [Validators.required, Validators.minLength(4)]),
      currentQuantity: new FormControl('', [Validators.required]),
      instructions: new FormControl('', [Validators.required, Validators.minLength(10)]),
    })
  }

  ngOnInit(): void {}

  // Events
  addIngredient(): void {
    // Validate values 

    const newIngredientGroup = new FormGroup({
      name: new FormControl({ value: this.ingredientName?.value, disabled: true }),
      quantity: new FormControl({ value: this.ingredientQuantity?.value, disabled: true }),
    });
    
    this.ingredients.push(newIngredientGroup);
    this.ingredientName?.reset();
    this.ingredientQuantity?.reset();
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  handleSubmit(): void {

    if (this.recipeForm.valid) {

      const { dishName, instructions } = this.recipeForm.value;
      const ingredients: Ingredient[] = this.recipeForm.controls.ingredients.value;
  
      this.backendService.createRecipe({ dishName, ingredients, recipeInstructions: instructions })
        .subscribe(() => this.router.navigate(['/']));
    }
      
  }

  // get set
  get dishName() { return this.recipeForm.get('dishName'); }
  get ingredientName() { return this.recipeForm.get('currentIngredient'); }
  get ingredientQuantity() { return this.recipeForm.get('currentQuantity'); }
  get ingredients(): FormArray { return <FormArray> this.recipeForm.get('ingredients');}
  get instructions() { return this.recipeForm.get('instructions'); }

    
}
