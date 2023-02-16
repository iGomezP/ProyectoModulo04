import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;

  constructor(private snackBar: MatSnackBar) {}

  printError(error: HttpErrorResponse) {
    const path: string = error.error.path;
    if (path.includes('login') === true) {
      this.snackBar.open('Hubo un error al iniciar la sesión', 'Cerrar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
        panelClass: ['red-snackbar', 'login-snackbar'],
      });
    }
  }

  printBienvenida(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['green-snackbar', 'login-snackbar'],
    });
  }
}
