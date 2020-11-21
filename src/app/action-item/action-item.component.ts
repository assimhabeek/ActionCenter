import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Action, ActionItemType, JiraActionItemType} from '../model/action';
import * as _moment from 'moment';
import {Moment} from 'moment';
import {ACTION_CENTER_DATE_PARSE_FORMATS} from '../utils/date-formats';
import {Person} from '../model/person';

const moment = _moment;

@Component({
  selector: 'app-action-item',
  templateUrl: './action-item.component.html',
  styleUrls: ['./action-item.component.scss']
})
export class ActionItemComponent {

  @Input() action: Action;
  @Output() actionChange = new EventEmitter<Action>();

  @Input() personsList: Person[];

  public editMode: boolean;

  public editedDescription: string;


  getPersonById(id: number): Person {
    return this.personsList.find(x => x.id === id);
  }

  shouldHidePersonNames(): boolean {
    return this.action.assignedTo.length > 1;
  }

  initForm(): void {
    this.editedDescription = this.action.content;
    this.editMode = true;
  }

  onSubmit($event): void {
    if ($event.valid) {
      this.action.content = this.editedDescription;
      this.editMode = false;
      this.notifyDataChange();
    }
  }

  onCancel($event): void {
    $event.resetForm({description: this.action.content});
    this.editMode = false;
  }

  changeActionType(actionType: ActionItemType): void {
    this.action.type = actionType;
    this.notifyDataChange();
  }

  changeJiraActionType(jiraActionType: JiraActionItemType): void {
    this.action.jiraActionItemType = jiraActionType;
    this.notifyDataChange();
  }


  parseDate(): Moment {
    return moment([this.action.date], ACTION_CENTER_DATE_PARSE_FORMATS);
  }

  changeDate($event): void {
    const momentDate: Moment = $event.value;
    this.action.date = momentDate.format('DD-MM-YYYY');
    this.notifyDataChange();
  }

  excludeExistingPersons(): Person[] {
    return this.personsList.filter(x => this.action.assignedTo.indexOf(x.id) < 0);
  }

  addPersonId(id: number): void {
    this.action.assignedTo.push(id);
    this.notifyDataChange();
  }

  removePersonId(id: number): void {
    this.action.assignedTo = this.action.assignedTo.filter(x => x !== id);
    this.notifyDataChange();
  }

  replacePersonId(oldId: number, newId: number): void {
    this.removePersonId(oldId);
    this.addPersonId(newId);
  }

  notifyDataChange(): void {
    this.actionChange.emit(this.action);
  }
}
