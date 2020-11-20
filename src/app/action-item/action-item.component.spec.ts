import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ActionItemComponent} from './action-item.component';
import {MaterialModule} from "../material.module";
import {AppComponent} from "../app.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserTestingModule} from "@angular/platform-browser/testing";

describe('ActionComponent', () => {
  let component: ActionItemComponent;
  let fixture: ComponentFixture<ActionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionItemComponent],
      imports: [
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render when action is undefined', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.action-item')).toBeNull();
  });


});
