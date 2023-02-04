import { Directive, Input } from '@angular/core';

export type CardShadow = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'material';
type shadow = 'tw-shadow';
type ShadowsMap = { [key in CardShadow]: `${shadow}-${key}` };

export const CardShadows: Readonly<ShadowsMap> = Object.freeze({
  sm: 'tw-shadow-sm',
  md: 'tw-shadow-md',
  lg: 'tw-shadow-lg',
  xl: 'tw-shadow-xl',
  '2xl': 'tw-shadow-2xl',
  material: 'tw-shadow-material'
});

@Directive()
export class ShadowDirective {
  @Input()
  public shadow: CardShadow = 'lg';
}
