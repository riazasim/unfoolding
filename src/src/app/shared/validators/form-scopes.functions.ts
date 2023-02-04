import { formScope } from './scopes.functions';

export function placeholderScope(key: string): string {
  return formScope(`placeholders.${key}`);
}

export function errorsScope(key: string): string {
  return formScope(`errors.${key}`);
}
