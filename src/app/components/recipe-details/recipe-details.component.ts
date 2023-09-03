import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'models/Recipe';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecipeService } from 'services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent {
  recipeService: RecipeService;
  route: ActivatedRoute;
  recipe: Recipe | undefined;

  constructor(recipeService: RecipeService, route: ActivatedRoute) {
    this.recipeService = recipeService;
    this.route = route;
  }

  ngOnInit() {
    const id: Observable<string> = this.route.params.pipe(map(p => p.id));
    id.subscribe(id => this.recipeService.getById(id).subscribe(recipe => {this.recipe = recipe; console.log(this.recipe);}))
  }

}
