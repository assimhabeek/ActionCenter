import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {ActionItemComponent} from './action-item/action-item.component';
import {PersonComponent} from './person/person.component';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserTestingModule} from '@angular/platform-browser/testing';
import {FormsModule} from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ActionItemComponent,
        PersonComponent
      ],
      imports: [
        BrowserTestingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule
      ]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render toolbar', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-toolbar')).toBeTruthy();
  });


  it('should render toolbar title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-toolbar').textContent).toContain('Action Center');
  });

  it('should render actionList', () => {
    fixture.componentInstance.actionLists = [
      {
        id: 1,
        title: 'To Do',
        actions: [
          {
            id: 1,
            date: '1-7-2020',
            type: 'jira',
            jiraActionItemType: 'task',
            content: `Overcome key issues to meet key milestones drink ` +
              'from the firehose, yet beef up (let\'s not try to) ' +
              'boil the ocean (here/there/everywhere).',
            assignedTo: [1]
          }
        ]
      }
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.action-list')).toBeTruthy();
    expect(compiled.querySelector('.action-list-title').textContent).toContain('To Do');
    expect(compiled.querySelector('app-action-item')).toBeTruthy();
  });


});
