import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  authService: AuthService
  constructor(authService: AuthService) {
    this.authService = authService
  }

  ngOnInit() {
    this.authService.checkLoggedIn()
  }

}
