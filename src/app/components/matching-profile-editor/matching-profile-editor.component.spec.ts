import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingProfileEditorComponent } from './matching-profile-editor.component';

describe('MatchingProfileEditorComponent', () => {
  let component: MatchingProfileEditorComponent;
  let fixture: ComponentFixture<MatchingProfileEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchingProfileEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchingProfileEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
