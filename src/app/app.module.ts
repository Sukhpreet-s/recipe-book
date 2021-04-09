import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddRecipeComponent } from 'components/add-recipe/add-recipe.component';
import { NavbarComponent } from 'components/navbar/navbar.component';
import { BackendService } from 'services/backend/backend.service';
import { RecipeService } from 'services/recipe/recipe.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ListRecipesComponent } from './components/list-recipes/list-recipes.component';

@NgModule({
  declarations: [
    AppComponent,
    AddRecipeComponent,
    NavbarComponent,
    ListRecipesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    BackendService,
    RecipeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
