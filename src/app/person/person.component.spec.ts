import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonComponent} from './person.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../material.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render when person is not provided', () => {
    // in case action is initialised inside component
    component.person = null;

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.person')).toBeNull();
  });

  it('should render person', () => {

    component.person = {
      id: 1,
      name: 'Bernice Fletcher',
      avatarColor: 'orange'
    };

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.person')).toBeTruthy();
  });

  it('should hide person name when : @Input() hideName = true', () => {

    component.person = {
      id: 1,
      name: 'Bernice Fletcher',
      avatarColor: 'orange'
    };

    component.hideName = true;

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.person-name')).toBeNull();
  });

  it('should display person name when : @Input() hideName = false', () => {

    component.person = {
      id: 1,
      name: 'Bernice Fletcher',
      avatarColor: 'orange'
    };

    component.hideName = false;

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.person-name')).toBeTruthy();
    expect(compiled.querySelector('.person-name').textContent).toEqual('Bernice Fletcher');
  });

  it('should display BF as initials for Bernice Fletcher', () => {

    component.person = {
      id: 1,
      name: 'Bernice Fletcher',
      avatarColor: 'orange'
    };

    component.hideName = false;

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.person-image').textContent).toEqual('BF');
  });

  it('should display correct avatar color', () => {

    const person = {
      id: 1,
      name: 'Bernice Fletcher',
      avatarColor: 'orange'
    };

    component.person = person;

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.person-image').style.backgroundColor).toEqual(person.avatarColor);
  });

  it('should render initials inside a circle', () => {

    const person = {
      id: 1,
      name: 'Bernice Fletcher',
      avatarColor: 'orange'
    };

    component.person = person;

    fixture.detectChanges();

    const compiled = fixture.nativeElement;

    const style = document.defaultView.getComputedStyle(compiled.querySelector('.person-image'), null);
    expect(style.getPropertyValue('border-radius')).toEqual('50%');
  });


});
