import {Component, OnInit} from '@angular/core';
import {ActionList} from './model/action-list';
import {Person} from './model/person';
import {Action} from './model/action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public actionLists: ActionList[];
  public personsList: Person[];

  ngOnInit(): void {
    this.actionLists = [
      {
        id: 1,
        title: 'To Do',
        actions: [
          {
            id: 1,
            date: '1-7-2020',
            type: 'jira',
            content: `Overcome key issues to meet key milestones drink ` +
              'from the firehose, yet beef up (let\'s not try to) ' +
              'boil the ocean (here/there/everywhere).',
            assignedTo: [1]
          }
        ]
      },
      {
        id: 2,
        title: 'In progress',
        actions: []
      },
      {
        id: 3,
        title: 'Done',
        actions: []
      }
    ];

    this.personsList = [
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

  }

  updateAction(action: Action, actionListId: number): void {
    const actionListIndex = this.actionLists.findIndex(x => x.id === actionListId);
    const actionIndex: number = this.actionLists[actionListIndex].actions.findIndex((x: Action) => x.id === action.id);
    this.actionLists[actionListIndex].actions[actionIndex] = action;
  }
}
