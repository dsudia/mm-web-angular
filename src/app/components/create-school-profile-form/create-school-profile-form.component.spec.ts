import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSchoolProfileFormDialogComponent } from './create-school-profile-form.component';

describe('CreateProfileFormComponent', () => {
  let component: CreateSchoolProfileFormDialogComponent;
  let fixture: ComponentFixture<CreateSchoolProfileFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSchoolProfileFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSchoolProfileFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
