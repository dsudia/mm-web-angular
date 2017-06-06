import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MdCardModule, MdButtonModule, MdDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { ForSchoolsComponent } from './for-schools/for-schools.component';
import { ForTeachersComponent } from './for-teachers/for-teachers.component';
import { FaqButtonComponent, FaqDialogComponent } from './faq/faq.component';
import { HeaderComponent } from './header/header.component';
import { TermsComponent } from './terms/terms.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = []

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
    TermsComponent,
    RegisterFormComponent,
    SignInFormComponent,
    ProfileComponent
  ],
  entryComponents: [
    FaqDialogComponent,
    TermsComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MdCardModule,
    MdButtonModule,
    MdDialogModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
