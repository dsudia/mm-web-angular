import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForSchoolsComponent } from './for-schools.component';

describe('ForSchoolsComponent', () => {
  let component: ForSchoolsComponent;
  let fixture: ComponentFixture<ForSchoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForSchoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
