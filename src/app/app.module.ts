import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddRecipeComponent } from 'components/add-recipe/add-recipe.component';
import { NavbarComponent } from 'components/navbar/navbar.component';
import { BackendService } from 'services/backend/backend.service';
import { RecipeService } from 'services/recipe/recipe.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ListRecipesComponent } from './components/list-recipes/list-recipes.component';
import { AboutComponent } from './components/about/about.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { FileInputAccessorModule } from 'file-input-accessor';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    AppComponent,
    AddRecipeComponent,
    NavbarComponent,
    ListRecipesComponent,
    AboutComponent,
    RecipeDetailsComponent,
    ImageUploaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    ImageCropperModule,
    FileInputAccessorModule,
  ],
  providers: [
    BackendService,
    RecipeService,
    provideRouter(routes, withComponentInputBinding()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
