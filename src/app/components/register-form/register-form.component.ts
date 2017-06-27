import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms'

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

  types = [
    { value: 0, viewValue: "Educator" },
    { value: 1, viewValue: "School" }
  ]

  constructor(
    public dialogRef: MdDialogRef<RegisterFormDialogComponent>,
    private fb: FormBuilder
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
      ]],
      passconf: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        PasswordValidation.matchPassword
      ]],
      memberType: [0, [
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
    console.log(value, valid)
    this.dialogRef.close()
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
      'minlength': 'email must be at least 8 characters long',
      'maxlength': 'email must be less than 50 characters long'
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
