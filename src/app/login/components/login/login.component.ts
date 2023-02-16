import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/api/auth.service';
import { LocalStorageService } from 'src/app/services/api/local-storage.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = {
    username: '',
    password: '',
  };

  public userToken: any;
  hidePassword = true;

  constructor(
    private authService: AuthService,
    private storageService: LocalStorageService,
    private router: Router,
    private snackService: SnackbarService
  ) {}

  login(): void {
    const { username, password } = this.form;
    this.authService.apiLogin(username, password).subscribe({
      next: (res) => {
        this.userToken = res;
      },
      error: (error) => this.snackService.printError(error),
      complete: () => {
        this.saveToken();
        this.router.navigate(['']).then(() => window.location.reload());
      },
    });
  }

  saveToken() {
    this.resetForm();
    this.storageService.cleanToken('User');
    this.storageService.setToken('User', this.userToken);
  }

  resetForm() {
    this.form.username = '';
    this.form.password = '';
  }
}
