import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';

export function handleErrorsBySnackbar<ErrType>(
  err: ErrType, snackbarService: MatSnackBar, message: string,
  action?: string, config: MatSnackBarConfig = {duration: 1500}, onAction?: () => void): MatSnackBarRef<unknown> {
  console.log(err);
  const snackbar = snackbarService.open(message, action, {
    panelClass: 'mat-danger-snackbar',
    ...config
  });

  if (typeof onAction === 'function') {
    snackbar.onAction().subscribe({
      next: () => onAction()
    });
  }

  return snackbar;
}

export function handleSuccessBySnackbar(
  snackbarService: MatSnackBar, message: string,
  action?: string, config?: MatSnackBarConfig, onAction?: () => void): MatSnackBarRef<unknown> {

  const snackbar = snackbarService.open(message, action, {
    panelClass: 'mat-success-snackbar',
    ...config
  });

  if (typeof onAction === 'function') {
    snackbar.onAction().subscribe({
      next: () => onAction()
    });
  }

  return snackbar;

}
