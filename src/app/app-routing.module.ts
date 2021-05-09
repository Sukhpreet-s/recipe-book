import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from 'components/about/about.component';
import { ListRecipesComponent } from 'components/list-recipes/list-recipes.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';

const routes: Routes = [
  { path: 'add-recipe', component: AddRecipeComponent },
  { path: 'list-recipes', component: ListRecipesComponent },
  { path: '', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
