import {Person} from './person';

export interface Action {
  id: number;
  title: string;
  description: string;
  assignedTo: Person[];
}
