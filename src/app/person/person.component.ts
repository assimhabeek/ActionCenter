import {Component, Input, OnInit} from '@angular/core';
import {Person} from '../model/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Input() person: Person;

  @Input() hideName: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  getPersonNameInitials = (): string => {
    return this.person.name
      .split(' ')
      .map(nameSplit => nameSplit[0])
      .join('')
      .toUpperCase();
  }


}
