import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfileFormComponent } from './create-profile-form.component';

describe('CreateProfileFormComponent', () => {
  let component: CreateProfileFormComponent;
  let fixture: ComponentFixture<CreateProfileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProfileFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
