import { Directive, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Directive()
export class GenericConfirmationModal<T> {

  public readonly config: T;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { config: T },
    private readonly dialogRef: MatDialogRef<T>) {
    this.config = data.config;
  }

  public cancel(): void {
    this.dialogRef.close(false);
  }

  public confirm(): void {
    this.dialogRef.close(true);
  }
}
