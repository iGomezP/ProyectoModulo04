import { Component, OnInit } from '@angular/core';
import { FunkosService } from 'src/app/services/api/funkos.service';
import { LocalStorageService } from 'src/app/services/api/local-storage.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  public allFunkosData: any;
  private validateToken!: boolean;
  private validateRol!: string;

  constructor(
    private funkosService: FunkosService,
    private storageService: LocalStorageService
  ) {}

  getAllFunkos() {
    this.validateToken = this.storageService.validateTokenExpiration('User');
    this.validateRol = this.storageService.getUserRole('User');
    if (!this.validateToken) {
      if (this.validateRol === 'ADMIN' || this.validateRol === 'USER') {
        this.funkosService.getAllFunkosService().subscribe({
          next: (data) => {
            this.allFunkosData = data._embedded.funko;
            console.log(this.allFunkosData);
            console.log(data);
          },
          error: (error) => console.log(error),
        });
      }
      // Redirigir a login con mensaje
    }
  }

  ngOnInit(): void {
    this.getAllFunkos();
  }
}
