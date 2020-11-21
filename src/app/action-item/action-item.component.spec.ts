import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ActionItemComponent} from './action-item.component';
import {MaterialModule} from '../material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PersonComponent} from '../person/person.component';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatMenuHarness} from '@angular/material/menu/testing';
import {By} from '@angular/platform-browser';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatDatepickerInputHarness} from '@angular/material/datepicker/testing';
import {MatInputHarness} from "@angular/material/input/testing";
import {MatButtonHarness} from "@angular/material/button/testing";

describe('ActionComponent', () => {
  let component: ActionItemComponent;
  let fixture: ComponentFixture<ActionItemComponent>;
  let loader: HarnessLoader;
  let rootLoader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ActionItemComponent,
        PersonComponent
      ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionItemComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render when action is not provided', () => {

    // in case action is initialised inside component
    component.action = null;

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.action-item')).toBeNull();
  });

  it('should not render when personList not provided', () => {

    // in case action is initialised inside component
    component.personsList = null;

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.action-item')).toBeNull();
  });

  it('should render', () => {

    // in case action is initialised inside component
    component.action = {
      id: 1,
      date: '1-7-2020',
      type: 'jira',
      jiraActionItemType: 'task',
      content: `Overcome key issues to meet key milestones drink ` +
        'from the firehose, yet beef up (let\'s not try to) ' +
        'boil the ocean (here/there/everywhere).',
      assignedTo: [1]
    };

    component.personsList = [
      {
        id: 1,
        name: 'Bernice Fletcher',
        avatarColor: 'orange'
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.action-item')).toBeTruthy();
  });

  it('should render Assigned to Person', () => {

    // in case action is initialised inside component
    component.action = {
      id: 1,
      date: '1-7-2020',
      type: 'jira',
      jiraActionItemType: 'task',
      content: `Overcome key issues to meet key milestones drink ` +
        'from the firehose, yet beef up (let\'s not try to) ' +
        'boil the ocean (here/there/everywhere).',
      assignedTo: [1]
    };

    component.personsList = [
      {
        id: 1,
        name: 'Bernice Fletcher',
        avatarColor: 'orange'
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.action-assignedTo-container app-person')).toBeTruthy();
  });

  it('should display person name when action assigned to one Person', () => {

    // in case action is initialised inside component
    component.action = {
      id: 1,
      date: '1-7-2020',
      type: 'jira',
      jiraActionItemType: 'task',
      content: `Overcome key issues to meet key milestones drink ` +
        'from the firehose, yet beef up (let\'s not try to) ' +
        'boil the ocean (here/there/everywhere).',
      assignedTo: [1]
    };

    component.personsList = [
      {
        id: 1,
        name: 'Bernice Fletcher',
        avatarColor: 'orange'
      }
    ];

    expect(component.taskAssignedToManyPersons()).toBeFalse();
  });

  it('should hide person name when action assigned to many Persons', () => {

    // in case action is initialised inside component
    component.action = {
      id: 1,
      date: '1-7-2020',
      type: 'jira',
      jiraActionItemType: 'task',
      content: `Overcome key issues to meet key milestones drink ` +
        'from the firehose, yet beef up (let\'s not try to) ' +
        'boil the ocean (here/there/everywhere).',
      assignedTo: [1, 2]
    };

    component.personsList = [
      {
        id: 1,
        name: 'Bernice Fletcher',
        avatarColor: 'orange'
      },
      {
        id: 2,
        name: 'Deann Stevens',
        avatarColor: 'blue'
      },
    ];

    expect(component.taskAssignedToManyPersons()).toBeTrue();
  });

  it('should open menu on person click', async (done) => {

    // in case action is initialised inside component
    component.action = {
      id: 1,
      date: '1-7-2020',
      type: 'jira',
      jiraActionItemType: 'task',
      content: `Overcome key issues to meet key milestones drink ` +
        'from the firehose, yet beef up (let\'s not try to) ' +
        'boil the ocean (here/there/everywhere).',
      assignedTo: [1, 2]
    };

    component.personsList = [
      {
        id: 1,
        name: 'Bernice Fletcher',
        avatarColor: 'orange'
      },
      {
        id: 2,
        name: 'Deann Stevens',
        avatarColor: 'blue'
      },
    ];

    fixture.detectChanges();

    const personComponent = fixture.debugElement
      .query(By.directive(PersonComponent));


    personComponent.nativeNode.dispatchEvent(new Event('click'));

    let menu = await rootLoader.getHarness(MatMenuHarness.with({selector: '.action-assignedTo'}));

    const isOpen = await menu.isOpen();

    expect(isOpen).toBeTrue();

    await menu.close();

    done();
  });

  it('should pass only unassigned people to menu', () => {

    // in case action is initialised inside component
    component.action = {
      id: 1,
      date: '1-7-2020',
      type: 'jira',
      jiraActionItemType: 'task',
      content: `Overcome key issues to meet key milestones drink ` +
        'from the firehose, yet beef up (let\'s not try to) ' +
        'boil the ocean (here/there/everywhere).',
      assignedTo: [1]
    };

    component.personsList = [
      {
        id: 1,
        name: 'Bernice Fletcher',
        avatarColor: 'orange'
      },
      {
        id: 2,
        name: 'Deann Stevens',
        avatarColor: 'blue'
      },
      {
        id: 3,
        name: 'Samuel Johnson',
        avatarColor: 'green'
      }
    ];

    fixture.detectChanges();

    const excludedOne = component.excludeExistingPersons();

    expect(excludedOne).toEqual([
      {
        id: 2,
        name: 'Deann Stevens',
        avatarColor: 'blue'
      },
      {
        id: 3,
        name: 'Samuel Johnson',
        avatarColor: 'green'
      }
    ]);

    component.action.assignedTo.push(2);

    const excludedTwo = component.excludeExistingPersons();

    expect(excludedTwo).toEqual([
      {
        id: 3,
        name: 'Samuel Johnson',
        avatarColor: 'green'
      }
    ]);


    component.action.assignedTo.push(3);
    const excludedThree = component.excludeExistingPersons();

    expect(excludedThree).toEqual([]);

  });

  it('should add new person to achieve the action', () => {

    // in case action is initialised inside component
    component.action = {
      id: 1,
      date: '1-7-2020',
      type: 'jira',
      jiraActionItemType: 'task',
      content: `Overcome key issues to meet key milestones drink ` +
        'from the firehose, yet beef up (let\'s not try to) ' +
        'boil the ocean (here/there/everywhere).',
      assignedTo: [1]
    };

    component.personsList = [
      {
        id: 1,
        name: 'Bernice Fletcher',
        avatarColor: 'orange'
      },
      {
        id: 2,
        name: 'Deann Stevens',
        avatarColor: 'blue'
      },
      {
        id: 3,
        name: 'Samuel Johnson',
        avatarColor: 'green'
      }
    ];

    fixture.detectChanges();

    component.addPersonId(2);

    expect(component.action.assignedTo).toContain(2);


  });

  it('should remove person from action assignment', () => {

    // in case action is initialised inside component
    component.action = {
      id: 1,
      date: '1-7-2020',
      type: 'jira',
      jiraActionItemType: 'task',
      content: `Overcome key issues to meet key milestones drink ` +
        'from the firehose, yet beef up (let\'s not try to) ' +
        'boil the ocean (here/there/everywhere).',
      assignedTo: [1]
    };

    component.personsList = [
      {
        id: 1,
        name: 'Bernice Fletcher',
        avatarColor: 'orange'
      },
      {
        id: 2,
        name: 'Deann Stevens',
        avatarColor: 'blue'
      },
      {
        id: 3,
        name: 'Samuel Johnson',
        avatarColor: 'green'
      }
    ];

    fixture.detectChanges();

    component.removePersonId(1);

    expect(component.action.assignedTo).not.toContain(1);

  });

  it('should replace person in action assignment', () => {

    // in case action is initialised inside component
    component.action = {
      id: 1,
      date: '1-7-2020',
      type: 'jira',
      jiraActionItemType: 'task',
      content: `Overcome key issues to meet key milestones drink ` +
        'from the firehose, yet beef up (let\'s not try to) ' +
        'boil the ocean (here/there/everywhere).',
      assignedTo: [1]
    };

    component.personsList = [
      {
        id: 1,
        name: 'Bernice Fletcher',
        avatarColor: 'orange'
      },
      {
        id: 2,
        name: 'Deann Stevens',
        avatarColor: 'blue'
      },
      {
        id: 3,
        name: 'Samuel Johnson',
        avatarColor: 'green'
      }
    ];

    fixture.detectChanges();

    component.replacePersonId(1, 2);

    expect(component.action.assignedTo).not.toContain(1);
    expect(component.action.assignedTo).toContain(2);

  });

  it('should parse and output a correct date', async (done) => {

    // in case action is initialised inside component
    component.action = {
      id: 1,
      date: '1-7-2020',
      type: 'jira',
      jiraActionItemType: 'task',
      content: `Overcome key issues to meet key milestones drink ` +
        'from the firehose, yet beef up (let\'s not try to) ' +
        'boil the ocean (here/there/everywhere).',
      assignedTo: [1]
    };

    component.personsList = [
      {
        id: 1,
        name: 'Bernice Fletcher',
        avatarColor: 'orange'
      }
    ];

    fixture.detectChanges();


    const datePickerTrigger = await rootLoader.getHarness(MatDatepickerInputHarness);

    // checking for parse
    const oldValue = await datePickerTrigger.getValue();
    expect(oldValue).toEqual('July 1st');


    await datePickerTrigger.openCalendar();
    const calender = await datePickerTrigger.getCalendar();
    await calender.selectCell({text: '5'});
    await datePickerTrigger.closeCalendar();

    expect(component.action.date).toEqual('05-07-2020');
    done();
  });

  it('should render form only after double click', () => {

    // in case action is initialised inside component
    component.action = {
      id: 1,
      date: '1-7-2020',
      type: 'jira',
      jiraActionItemType: 'task',
      content: `Overcome key issues to meet key milestones drink ` +
        'from the firehose, yet beef up (let\'s not try to) ' +
        'boil the ocean (here/there/everywhere).',
      assignedTo: [1]
    };

    component.personsList = [
      {
        id: 1,
        name: 'Bernice Fletcher',
        avatarColor: 'orange'
      }
    ];

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.action-content')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.action-content-form')).toBeNull();

    fixture.nativeElement.querySelector('.action-content').dispatchEvent(new Event('dblclick'));

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.action-content')).toBeNull();
    expect(fixture.nativeElement.querySelector('.action-content-form')).toBeTruthy();

  });


  it('should render textarea and two button inside form', () => {

    // in case action is initialised inside component
    component.action = {
      id: 1,
      date: '1-7-2020',
      type: 'jira',
      jiraActionItemType: 'task',
      content: `Overcome key issues to meet key milestones drink ` +
        'from the firehose, yet beef up (let\'s not try to) ' +
        'boil the ocean (here/there/everywhere).',
      assignedTo: [1]
    };

    component.personsList = [
      {
        id: 1,
        name: 'Bernice Fletcher',
        avatarColor: 'orange'
      }
    ];

    fixture.detectChanges();

    const actionContent = fixture.nativeElement.querySelector('.action-content');
    actionContent.dispatchEvent(new Event('dblclick'));

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.action-content-form textarea')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.action-content-form button[type="submit"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.action-content-form button[type="reset"]')).toBeTruthy();

  });

  it('should render error when form is submited invalid', async (done) => {

    // in case action is initialised inside component
    component.action = {
      id: 1,
      date: '1-7-2020',
      type: 'jira',
      jiraActionItemType: 'task',
      content: `Overcome key issues to meet key milestones drink ` +
        'from the firehose, yet beef up (let\'s not try to) ' +
        'boil the ocean (here/there/everywhere).',
      assignedTo: [1]
    };

    component.personsList = [
      {
        id: 1,
        name: 'Bernice Fletcher',
        avatarColor: 'orange'
      }
    ];

    fixture.detectChanges();

    const actionContent = fixture.nativeElement.querySelector('.action-content');
    actionContent.dispatchEvent(new Event('dblclick'));

    fixture.detectChanges();

    const textarea = await loader.getHarness(MatInputHarness.with({selector: 'textarea'}))
    const submitButton = await loader.getHarness(MatButtonHarness.with({selector: '[type="submit"]'}))

    expect(fixture.nativeElement.querySelector('.action-content-form mat-error')).toBeFalsy();

    await textarea.setValue('');
    await submitButton.click();

    expect(fixture.nativeElement.querySelector('.action-content-form mat-error')).toBeTruthy();

    done();
  });

  it('should update action content when valid form is submitted', async (done) => {

    // in case action is initialised inside component
    component.action = {
      id: 1,
      date: '1-7-2020',
      type: 'jira',
      jiraActionItemType: 'task',
      content: `Overcome key issues to meet key milestones drink ` +
        'from the firehose, yet beef up (let\'s not try to) ' +
        'boil the ocean (here/there/everywhere).',
      assignedTo: [1]
    };

    component.personsList = [
      {
        id: 1,
        name: 'Bernice Fletcher',
        avatarColor: 'orange'
      }
    ];

    fixture.detectChanges();

    const actionContent = fixture.nativeElement.querySelector('.action-content');
    actionContent.dispatchEvent(new Event('dblclick'));

    fixture.detectChanges();

    const textarea = await loader.getHarness(MatInputHarness.with({selector: 'textarea'}))
    const submitButton = await loader.getHarness(MatButtonHarness.with({selector: '[type="submit"]'}))

    await textarea.setValue('aa');
    await submitButton.click();

    expect(fixture.componentInstance.action.content).toEqual('aa');

    done();
  });

  it('should not update action content when cancel button is clicked', async (done) => {

    // in case action is initialised inside component
    component.action = {
      id: 1,
      date: '1-7-2020',
      type: 'jira',
      jiraActionItemType: 'task',
      content: `Overcome key issues to meet key milestones drink ` +
        'from the firehose, yet beef up (let\'s not try to) ' +
        'boil the ocean (here/there/everywhere).',
      assignedTo: [1]
    };

    component.personsList = [
      {
        id: 1,
        name: 'Bernice Fletcher',
        avatarColor: 'orange'
      }
    ];

    fixture.detectChanges();

    const actionContent = fixture.nativeElement.querySelector('.action-content');
    actionContent.dispatchEvent(new Event('dblclick'));

    fixture.detectChanges();

    const textarea = await loader.getHarness(MatInputHarness.with({selector: 'textarea'}))
    const resetButton = await loader.getHarness(MatButtonHarness.with({selector: '[type="reset"]'}))

    await textarea.setValue('aa');
    await resetButton.click();


    const originalText = `Overcome key issues to meet key milestones drink ` +
      'from the firehose, yet beef up (let\'s not try to) ' +
      'boil the ocean (here/there/everywhere).';
    expect(fixture.componentInstance.action.content).toEqual(originalText);

    done();
  });


  it('should open menu on action type menu click', async (done) => {

    // in case action is initialised inside component
    component.action = {
      id: 1,
      date: '1-7-2020',
      type: 'jira',
      jiraActionItemType: 'task',
      content: `Overcome key issues to meet key milestones drink ` +
        'from the firehose, yet beef up (let\'s not try to) ' +
        'boil the ocean (here/there/everywhere).',
      assignedTo: [1, 2]
    };

    component.personsList = [
      {
        id: 1,
        name: 'Bernice Fletcher',
        avatarColor: 'orange'
      },
      {
        id: 2,
        name: 'Deann Stevens',
        avatarColor: 'blue'
      },
    ];

    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('.action-type-menu-trigger');

    trigger.dispatchEvent(new Event('click'));

    let menu = await rootLoader.getHarness(MatMenuHarness.with({selector: '.action-type-menu-trigger'}));

    const isOpen = await menu.isOpen();

    expect(isOpen).toBeTrue();

    await menu.close();

    done();
  });

  it('should open menu on jira action type menu click', async (done) => {

    // in case action is initialised inside component
    component.action = {
      id: 1,
      date: '1-7-2020',
      type: 'jira',
      jiraActionItemType: 'task',
      content: `Overcome key issues to meet key milestones drink ` +
        'from the firehose, yet beef up (let\'s not try to) ' +
        'boil the ocean (here/there/everywhere).',
      assignedTo: [1, 2]
    };

    component.personsList = [
      {
        id: 1,
        name: 'Bernice Fletcher',
        avatarColor: 'orange'
      },
      {
        id: 2,
        name: 'Deann Stevens',
        avatarColor: 'blue'
      },
    ];

    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('.jiar-action-type-button');

    trigger.dispatchEvent(new Event('click'));

    let menu = await rootLoader.getHarness(MatMenuHarness.with({selector: '.jiar-action-type-button'}));

    const isOpen = await menu.isOpen();

    expect(isOpen).toBeTrue();

    await menu.close();

    done();
  });

  it('should render jira action type menu only if action type is jira', () => {

    // in case action is initialised inside component
    component.action = {
      id: 1,
      date: '1-7-2020',
      type: 'jira',
      jiraActionItemType: 'task',
      content: `Overcome key issues to meet key milestones drink ` +
        'from the firehose, yet beef up (let\'s not try to) ' +
        'boil the ocean (here/there/everywhere).',
      assignedTo: [1, 2]
    };

    component.personsList = [
      {
        id: 1,
        name: 'Bernice Fletcher',
        avatarColor: 'orange'
      },
      {
        id: 2,
        name: 'Deann Stevens',
        avatarColor: 'blue'
      },
    ];

    fixture.detectChanges();


    expect(fixture.nativeElement.querySelector('.jiar-action-type-button')).toBeTruthy();

    component.action.type = "default";

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.jiar-action-type-button')).toBeFalsy();
  });


})
;
