/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GuessClanComponent } from './guess-clan.component';

describe('GuessClanComponent', () => {
  let component: GuessClanComponent;
  let fixture: ComponentFixture<GuessClanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuessClanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessClanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
