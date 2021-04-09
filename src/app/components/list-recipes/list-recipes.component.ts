import { Component, OnInit } from '@angular/core';
import { Recipe } from 'models/Recipe';
import { BackendService } from 'services/backend/backend.service';

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.scss']
})
export class ListRecipesComponent implements OnInit {
  backendService: BackendService;
  recipeList: Recipe[];

  constructor(backendService: BackendService) {
    this.backendService = backendService;
    this.recipeList = [];
   }

  ngOnInit(): void {
    // fetch data from api
    this.backendService.getAllRecipes()
      .subscribe(recipes => this.recipeList = recipes);
    
  }

}
