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
      ingredients: new FormArray([], [Validators.required]),
      currentIngredient: new FormControl(''),
      currentQuantity: new FormControl(''),
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
      console.log(this.recipeForm.value)
      

      const { dishName, instructions } = this.recipeForm.value;
      const ingredients: Ingredient[] = this.recipeForm.controls.ingredients.value;
  
      this.backendService.createRecipe({ dishName, ingredients, recipeInstruction: instructions })
        .subscribe(() => this.router.navigate(['/list-recipes']));
    }
      
  }

  // get set
  get dishName() { return this.recipeForm.get('dishName'); }
  get ingredientName() { return this.recipeForm.get('currentIngredient'); }
  get ingredientQuantity() { return this.recipeForm.get('currentQuantity'); }
  get ingredients(): FormArray { return <FormArray> this.recipeForm.get('ingredients');}
  get instructions() { return this.recipeForm.get('instructions'); }

    
}
