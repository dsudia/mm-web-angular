import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'

import { MdCardModule,
         MdButtonModule,
         MdDialogModule,
         MdInputModule,
         MdSelectModule,
         MdToolbarModule
        } from '@angular/material';
import { CovalentMessageModule } from '@covalent/core'

// Components
import { AppComponent } from './app.component';
import {
  CreateEducatorProfileFormDialogComponent,
} from './components/create-educator-profile-form/create-educator-profile-form.component';
import {
  CreateSchoolProfileFormDialogComponent,
} from './components/create-school-profile-form/create-school-profile-form.component';
import { FaqButtonComponent, FaqDialogComponent } from './components/faq/faq.component';
import { ForSchoolsComponent } from './components/for-schools/for-schools.component';
import { ForTeachersComponent } from './components/for-teachers/for-teachers.component';
import { HomeComponent } from './components/home/home.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterFormButtonComponent, RegisterFormDialogComponent } from './components/register-form/register-form.component';
import { SignInFormButtonComponent, SignInFormDialogComponent } from './components/sign-in-form/sign-in-form.component';
import { TermsButtonComponent, TermsDialogComponent } from './components/terms/terms.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component'

// Services
import { AuthService } from './services/auth/auth.service';
import { ProfileService } from './services/profile/profile.service'

import { AuthGuard, appRoutes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HowItWorksComponent,
    ForSchoolsComponent,
    ForTeachersComponent,
    FaqButtonComponent,
    FaqDialogComponent,
    TermsButtonComponent,
    TermsDialogComponent,
    RegisterFormButtonComponent,
    RegisterFormDialogComponent,
    SignInFormButtonComponent,
    SignInFormDialogComponent,
    ProfileComponent,
    ToolbarComponent,
    CreateEducatorProfileFormDialogComponent,
    CreateSchoolProfileFormDialogComponent
  ],
  entryComponents: [
    CreateEducatorProfileFormDialogComponent,
    CreateSchoolProfileFormDialogComponent,
    FaqDialogComponent,
    RegisterFormDialogComponent,
    SignInFormDialogComponent,
    TermsDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MdCardModule,
    MdButtonModule,
    MdDialogModule,
    MdInputModule,
    MdSelectModule,
    MdToolbarModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    CovalentMessageModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard,
    AuthService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
