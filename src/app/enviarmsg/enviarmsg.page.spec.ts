import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarmsgPage } from './enviarmsg.page';

describe('EnviarmsgPage', () => {
  let component: EnviarmsgPage;
  let fixture: ComponentFixture<EnviarmsgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviarmsgPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarmsgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
