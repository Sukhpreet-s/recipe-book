import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from 'components/delete-modal/delete-modal.component';
import { Recipe } from 'models/Recipe';
import { RecipeService } from 'services/recipe/recipe.service';

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.scss']
})
export class ListRecipesComponent implements OnInit {
  recipeService: RecipeService;

  closeResult = '';

  constructor(recipeService: RecipeService, private modalService: NgbModal) {
    this.recipeService = recipeService;
   }

  ngOnInit(): void {
    // fetch data from api    
    this.recipeService.loadAll();
  }

  // Getters
  get recipeList() {
    return this.recipeService.getAll();
  }

  // Event handlers
  deleteRecipe(recipe: Recipe): void {
    if (recipe.id) {
      this.recipeService.deleteById(recipe.id);
    } else {
      console.log("Error while removing")
    }
  }

  // Modal functions

  // Function to open the delete confirmation modal
  openDeleteConfirmationModal(recipe: Recipe) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        // Handle the delete action here if confirmed
        if (result === 'Delete') {
          this.deleteRecipe(recipe);
        }
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
