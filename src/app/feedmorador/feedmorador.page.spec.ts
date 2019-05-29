import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedmoradorPage } from './feedmorador.page';

describe('FeedmoradorPage', () => {
  let component: FeedmoradorPage;
  let fixture: ComponentFixture<FeedmoradorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedmoradorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedmoradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
