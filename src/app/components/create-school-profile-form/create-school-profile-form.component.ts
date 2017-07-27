import { StringKey } from './../../../../server/interfaces';
import { Educator, School } from '../../interfaces';
import { ProfileService, isEducator } from './../../services/profile/profile.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { merge } from 'ramda';

interface EducatorBasics {
  firstName: string;
  lastName: string;
  description: string;
}

@Component({
  selector: 'app-create-school-profile-form-dialog',
  templateUrl: './create-school-profile-form-dialog.component.html',
  styleUrls: ['./create-school-profile-form-dialog.component.scss']
})
export class CreateSchoolProfileFormDialogComponent implements OnInit {

  profile: School;

  profileForm: FormGroup;
  backendError: Error;

  formErrors: StringKey = {
    name: '',
    description: '',
  }

  validationMessages: { [key: string]: StringKey } = {
    name: {
      required: 'School name is required',
    },
    description: {
      required: 'Description is required',
    }
  }

  constructor(
    public dialogRef: MdDialogRef<CreateSchoolProfileFormDialogComponent>,
    private fb: FormBuilder,
    private profileService: ProfileService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    if (isEducator(this.profile)) {
      // Should never happen, just makes it easy to work with.
    } else {
      this.profileForm = this.fb.group({
        name: [this.profile.name || '', [Validators.required]],
        description: [this.profile.description || '', [Validators.required]],
      });

      this.profileForm.valueChanges.subscribe(this.onValueChanged.bind(this));

      this.onValueChanged();
    }
  }

  onSubmit({ value, valid }: { value: EducatorBasics, valid: boolean }) {
    return this.profileService.patchSchoolProfile(value)
    .subscribe(() => this.dialogRef.close(), (error) => {
      console.error(error.json())
      this.backendError = error;
    });
  }

  onValueChanged() {
    if (!this.profileForm) { return }
    const form = this.profileForm

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + '; ';
        }
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

}
