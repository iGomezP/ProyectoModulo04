import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/api/auth.service';
import { LocalStorageService } from 'src/app/services/api/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isSessionExpired = false;
  userRoleLocal = '';
  roleVerified!: boolean;

  constructor(
    private storageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isSessionExpired = this.storageService.validateTokenExpiration('User');
    this.userRoleLocal = this.storageService.getUserRole('User');
    if (this.isSessionExpired) {
      this.storageService.cleanAll();
    }
    if (this.userRoleLocal === 'ADMIN') {
      this.roleVerified = true;
    } else {
      this.roleVerified = false;
    }
  }

  closeSession() {
    this.storageService.cleanAll();
    this.ngOnInit();
    this.router.navigate(['/login']).then(() => window.location.reload());
  }
}
