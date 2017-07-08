import { Component, OnInit } from '@angular/core';
import { camel } from 'change-case';

import { ProfileService } from '../../services/profile/profile.service';
import { Educator, School } from '../../../../server/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  memberType: number;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getProfile();
  }

  makeEducatorDisplayName(firstName: string, lastName: string) {
    const lastInitial = lastName.split('')[0].toUpperCase();
    firstName = camel(firstName);
    return `${firstName}${lastInitial}`;
  }

}
