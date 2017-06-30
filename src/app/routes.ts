import { CanActivate, Router, Routes } from '@angular/router'
import { Injectable } from '@angular/core'

import * as jwt from 'jsonwebtoken';

import { HomeComponent } from './components/home/home.component'
import { ProfileComponent } from './components/profile/profile.component'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const token = localStorage.getItem('authToken')

    if (token) {
      return true
    }
    this.router.navigate([''])
      return false
  }
}

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];
