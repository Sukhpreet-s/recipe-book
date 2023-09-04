import { Component, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageWithObjectURL } from 'models/util';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: ImageUploaderComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ImageUploaderComponent
    },
  ]
})
export class ImageUploaderComponent implements ControlValueAccessor, Validator {
  /**
   * This component should act as a FormControl
   * The output (value for the Form) should be a custom object with {name, objectURL, size}
   */

  @ViewChild('fileInput') fileInput: any;
  @ViewChild('content') content: any;

  selectedImage: File | undefined;
  croppedImage: ImageWithObjectURL | null = null;
  closeResult: string = '';

  touched: boolean = false;
  disabled: boolean = false;

  onChange = (croppedImage: ImageWithObjectURL | null) => {};
  onTouched = () => {};

  constructor(private modalService: NgbModal) {  }

  /**
   * Sets the selected image and opens the image cropper for the selected image.
   * @param files selected file in the input field
   */
  onFileChange(files: File[]): void {
    if(files && files.length>0) {
      // TODO: 
      this.selectedImage = files[0];
      this.open(this.content);
    }
  }

  /**
   * Mark as touched when clicked on the file upload input box.
   */
  onFileInputClick(): void {
    this.markAsTouched();
  }

  /**
   * Saves the cropped image in a variable.
   * @param event on image crop event
   */
  onImageCropped(event: ImageCroppedEvent): void {
    if(event.objectUrl && event.blob && this.selectedImage) {

      console.log("Event: ", event)

      this.croppedImage = {
        name: this.selectedImage?.name,
        objectURL: event.objectUrl,
        size: event.blob.size
      }

      this.onChange(this.croppedImage);
      
    } else {
      console.error("Error while cropping the image!")
    }
  }


  // Ng model functions
  open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.selectedImage = undefined;
        this.croppedImage = null;
        this.fileInput.nativeElement.value = '';
        this.croppedImage = null;
        this.onChange(this.croppedImage);
			},
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


  // Custom form control functions 
  writeValue(value: ImageWithObjectURL | null): void {
    this.croppedImage = value;
  }
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }
  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const image: ImageWithObjectURL = control.value;
    if(image && image.size > 1000000) {
      return {
        mustBeLessThan1MB: {
          size: image.size
        }
      }
    } 
      
    return null;
  }
}
