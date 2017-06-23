import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MdCardModule, MdButtonModule, MdDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { ForSchoolsComponent } from './components/for-schools/for-schools.component';
import { ForTeachersComponent } from './components/for-teachers/for-teachers.component';
import { FaqButtonComponent, FaqDialogComponent } from './components/faq/faq.component';
import { HeaderComponent } from './components/header/header.component';
import { TermsButtonComponent, TermsDialogComponent } from './components/terms/terms.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { SignInFormButtonComponent, SignInFormDialogComponent } from './components/sign-in-form/sign-in-form.component';
import { ProfileComponent } from './components/profile/profile.component';

import { UserDataService } from './services/user-data/user-data.service';

const appRoutes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HowItWorksComponent,
    ForSchoolsComponent,
    ForTeachersComponent,
    FaqButtonComponent,
    FaqDialogComponent,
    HeaderComponent,
    TermsButtonComponent,
    TermsDialogComponent,
    RegisterFormComponent,
    SignInFormButtonComponent,
    SignInFormDialogComponent,
    ProfileComponent
  ],
  entryComponents: [
    FaqDialogComponent,
    SignInFormDialogComponent,
    TermsDialogComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MdCardModule,
    MdButtonModule,
    MdDialogModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
