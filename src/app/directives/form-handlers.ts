import { FormGroup } from '@angular/forms';

export interface FormDataHandler<T> {
  handleFormData(formData: T): void;
}

export interface FormGroupHandler {
  handleForm(formGroup: FormGroup): void;
}
