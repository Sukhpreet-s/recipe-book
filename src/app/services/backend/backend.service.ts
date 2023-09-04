import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Recipe } from 'src/models/Recipe';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ImageWithObjectURL } from 'models/util';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  apiUrlRecipeEndpoint = `${environment.apiUrl}/recipe`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get all recipes.
   * @returns List of recipes stored in the server.
   */
  public getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrlRecipeEndpoint)
      .pipe(catchError(this.handleError));
  }

  /**
   * Adds the recipes
   * @param recipe new recipe to add
   * @returns recipe observable
   */
  public createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrlRecipeEndpoint, recipe)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get the recipe by id
   * @param id Id of the recipe
   * @returns recipe observable
   */
  public getRecipeById(id: String): Observable<Recipe> {
    return this.http.get<Recipe>(this.apiUrlRecipeEndpoint+"/"+id)
      .pipe(catchError(this.handleError));
  }

  /**
   * Deletes a recipe by id
   * @param recipeId id of recipe to delete
   * @returns Observable
   */
  public deleteRecipeById(recipeId: String): Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrlRecipeEndpoint}/${recipeId}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Upload image and get urls for the image.
   * @param image ImageWithObjectURL
   * @returns observable for list of urls to the image
   */
  public uploadImage(image: ImageWithObjectURL): Observable<String[]> {

    const response$ = new Observable<String[]>((observer) => {

      fetch(image.objectURL).then(res => res.blob()).then(blob => {
        const file = new File([blob], image.name);
        const fd = new FormData();
        fd.append('images', file);

        this.http.post<String[]>(this.apiUrlRecipeEndpoint + "/upload-multi-images", fd)
          .pipe(catchError(this.handleError))
          .subscribe(response => observer.next(response))
      });

      return {
        unsubscribe() {}
      }
    })

    return response$;
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
