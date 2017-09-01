import { PleaseWaitService } from './services/please-wait/please-wait.service';
import { MatchingService } from './services/matching/matching.service';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'

import { MdCardModule,
         MdIconModule,
         MdButtonModule,
         MdDialogModule,
         MdInputModule,
         MdSelectModule,
         MdToolbarModule
        } from '@angular/material';
import { CovalentMessageModule, CovalentFileModule } from '@covalent/core';
import { MdTooltipModule } from '@angular/material';
import { ImageCropperComponent } from 'ng2-img-cropper';

// Components
import { AppComponent } from './app.component';
import { AboutButtonComponent, AboutDialogComponent } from './components/about/about.component';
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
import { ProfileImageUploaderComponent } from './components/profile-image-uploader/profile-image-uploader.component';
import { LoadingStatusComponent } from './components/loading-status/loading-status.component';
import { MatchingProfileEditorComponent } from './components/matching-profile-editor/matching-profile-editor.component';

// Services
import { AuthService } from './services/auth/auth.service';
import { ProfileService } from './services/profile/profile.service'

import { AuthGuard, appRoutes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    AboutButtonComponent,
    AboutDialogComponent,
    HomeComponent,
    HowItWorksComponent,
    ForSchoolsComponent,
    ForTeachersComponent,
    FaqButtonComponent,
    FaqDialogComponent,
    ImageCropperComponent,
    TermsButtonComponent,
    TermsDialogComponent,
    RegisterFormButtonComponent,
    RegisterFormDialogComponent,
    SignInFormButtonComponent,
    SignInFormDialogComponent,
    ProfileComponent,
    ToolbarComponent,
    CreateEducatorProfileFormDialogComponent,
    CreateSchoolProfileFormDialogComponent,
    ProfileImageUploaderComponent,
    MatchingProfileEditorComponent,
    LoadingStatusComponent,
  ],
  entryComponents: [
    AboutDialogComponent,
    ProfileImageUploaderComponent,
    CreateEducatorProfileFormDialogComponent,
    CreateSchoolProfileFormDialogComponent,
    FaqDialogComponent,
    MatchingProfileEditorComponent,
    RegisterFormDialogComponent,
    SignInFormDialogComponent,
    TermsDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdCardModule,
    MdIconModule,
    MdButtonModule,
    MdDialogModule,
    MdInputModule,
    MdSelectModule,
    MdToolbarModule,
    MdTooltipModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    CovalentMessageModule,
    CovalentFileModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthGuard,
    AuthService,
    MatchingService,
    PleaseWaitService,
    ProfileService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
