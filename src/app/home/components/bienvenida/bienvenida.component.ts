import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/api/local-storage.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss'],
})
export class BienvenidaComponent implements OnInit {
  constructor(
    private localStorage: LocalStorageService,
    private snackService: SnackbarService
  ) {}

  ngOnInit(): void {
    const isLogged = this.localStorage.validateTokenExpiration('User');
    if (!isLogged) {
      this.snackService.printBienvenida('¡Bienvenido!');
    }
  }
}
