import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {ActionItemComponent} from "./action-item/action-item.component";
import {PersonComponent} from "./person/person.component";
import {MaterialModule} from "./material.module";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ActionItemComponent,
        PersonComponent
      ],
      imports: [
        MaterialModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it('should render toolbar title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-toolbar').textContent).toContain('ActionCenter');
  });


});
