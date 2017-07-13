import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms'
import { Router } from '@angular/router'

import { AuthService } from '../../services/auth/auth.service'

declare var require: any
const passValidator = require('password-validator');

interface SignInForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-in-button',
  templateUrl: './sign-in-formbutton.component.html',
  styleUrls: ['./sign-in-formbutton.component.scss']
})
export class SignInFormButtonComponent implements OnInit {
  config: MdDialogConfig;

  constructor(public dialog: MdDialog) {
    this.config = new MdDialogConfig();
    this.config.disableClose = true
  }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(SignInFormDialogComponent, {
      width: '50%',
      height: '35%',
      disableClose: true
    });
  }
}

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-formdialog.component.html',
  styleUrls: ['./sign-in-formdialog.component.scss']
})
export class SignInFormDialogComponent implements OnInit {
  signInForm: FormGroup;
  backendError: Error;

  constructor(
    public dialogRef: MdDialogRef<SignInFormDialogComponent>,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.signInForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(50),
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        // PasswordValidation.checkSchema
      ]]
    });

    this.signInForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: SignInForm) {
    if (!this.signInForm) { return }
    const form = this.signInForm

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

  onSubmit({ value, valid }: { value: SignInForm, valid: boolean }) {
    return this.authService.login(value.email, value.password)
    .then(() => {
      this.dialogRef.close()
      this.router.navigate(['/profile'])
    })
    .catch(err => {
      console.error(err.json())
      this.backendError = err;
    })
  }

  formErrors = {
    email: '',
    password: '',
  }

  validationMessages = {
    'email': {
      'required': 'email is required',
      'minlength': 'email must be at least 7 characters long',
      'maxlength': 'email must be less than 50 characters long',
      'email': 'email must be a valid email'
    },
    'password': {
      'required': 'password is required',
      'minlength': 'password must be at least 8 characters long',
      'maxlength': 'password must be less than 50 characters long',
      'schemaFail': 'password must contain uppercase, lowercase, number and symbol'
    }
  }
}

class PasswordValidation {
  static checkSchema(control: AbstractControl) {
    const schema = new passValidator();
    schema.is().min(8)
      .is().max(50)
      .has().uppercase()
      .has().lowercase()
      .has().digits()
      .has().symbols()
      .has().not().spaces();
    if (control.value && !schema.validate(control.value)) {
      return { schemaFail: true }
    }
    return null
  }
}
