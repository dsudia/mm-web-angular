import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms'
import { Router } from '@angular/router'

import { AuthService } from '../../services/auth/auth.service'

declare var require: any
const passValidator = require('password-validator');

interface RegisterForm {
  email: string;
  password: string;
  passConf: string;
  memberType: number;
}

@Component({
  selector: 'app-register-form-button',
  templateUrl: './register-form-button.component.html',
  styleUrls: ['./register-form-button.component.scss']
})
export class RegisterFormButtonComponent implements OnInit {
  config: MdDialogConfig;

  constructor(public dialog: MdDialog) {
    this.config = new MdDialogConfig();
    this.config.disableClose = true
  }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterFormDialogComponent, {
      width: '50%',
      height: '70%',
      disableClose: true
    });
  }

}

@Component({
  selector: 'app-register-form-dialog',
  templateUrl: './register-form-dialog.component.html',
  styleUrls: ['./register-form-dialog.component.scss']
})
export class RegisterFormDialogComponent implements OnInit {
  registerForm: FormGroup;
  backendError: Error;

  types = [
    { value: 1, viewValue: "Educator" },
    { value: 2, viewValue: "School" }
  ]

  constructor(
    public dialogRef: MdDialogRef<RegisterFormDialogComponent>,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
   ) {}

  createForm(): void {
    this.registerForm = this.fb.group({
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
        PasswordValidation.passSchema
      ]],
      passconf: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        PasswordValidation.matchPassword
      ]],
      memberType: [1, [
        Validators.required,
        Validators.min(0),
        Validators.max(1)
      ]]
    });

    this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit({ value, valid }: { value: RegisterForm, valid: boolean }) {
    return this.authService.sendRegistration(value.email, value.password, value.memberType)
    .then(() => {
      this.dialogRef.close()
      this.router.navigate(['/profile'])
    })
    .catch(err => {
      console.log(err.json())
      this.backendError = err;
    })
  }

  onValueChanged(data?: RegisterForm) {
    if (!this.registerForm) { return }
    const form = this.registerForm

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

  formErrors = {
    email: '',
    password: '',
    passconf: '',
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
    },
    'passconf': {
      'required': 'password confirmation is required',
      'minlength': 'password confirmation must be at least 8 characters long',
      'maxlength': 'password confirmation must be less than 50 characters long',
      'matchpassword': 'password confirmation must match password'
    }
  }

}

class PasswordValidation {
  static passSchema(control: AbstractControl) {
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

  static matchPassword(control: AbstractControl) {
    const password = control.root.get('password')
    const passconf = control.value
    if (password && passconf) {
      if (password.value !== passconf) {
        return { matchpassword: true }
      }
    }
    return null
  }
}
