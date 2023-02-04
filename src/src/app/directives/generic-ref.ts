import { Directive, ElementRef, Optional } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';

@Directive()
export class GenericRef<T> {

  constructor(
    @Optional() private readonly ngControl: NgControl,
    private readonly elementRef: ElementRef<T>
  ) { }

  get control(): AbstractControl {
    return this.ngControl as unknown as AbstractControl;
  }

  get nativeElement(): T {
    return this.elementRef.nativeElement;
  }
}
