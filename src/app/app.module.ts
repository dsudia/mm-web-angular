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

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { ForSchoolsComponent } from './components/for-schools/for-schools.component';
import { ForTeachersComponent } from './components/for-teachers/for-teachers.component';
import { FaqButtonComponent, FaqDialogComponent } from './components/faq/faq.component';
import { TermsButtonComponent, TermsDialogComponent } from './components/terms/terms.component';
import { RegisterFormButtonComponent, RegisterFormDialogComponent } from './components/register-form/register-form.component';
import { SignInFormButtonComponent, SignInFormDialogComponent } from './components/sign-in-form/sign-in-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ToolbarComponent }
 from './components/toolbar/toolbar.component'
// Services
import { AuthService } from './services/auth/auth.service';

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
    TermsButtonComponent,
    TermsDialogComponent,
    RegisterFormButtonComponent,
    RegisterFormDialogComponent,
    SignInFormButtonComponent,
    SignInFormDialogComponent,
    ProfileComponent,
    ToolbarComponent
  ],
  entryComponents: [
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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
