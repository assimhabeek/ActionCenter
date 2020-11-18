import {Component, OnInit} from '@angular/core';
import {ActionList} from './model/action-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public actionLists: ActionList[];

  ngOnInit(): void {
    this.actionLists = [
      {
        id: 1,
        title: 'To Do',
        actions: [
          {
            id: 1,
            title: '',
            description: `Overcome key issues to meet key milestones drink ` +
              'from the firehose, yet beef up (let\'s not try to) ' +
              'boil the ocean (here/there/everywhere).',
            assignedTo: [
              {
                id: 1,
                name: 'Bernice Fletcher',
                avatarColor: 'orange'
              }
            ]
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
  }

}
