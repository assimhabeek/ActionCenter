import {Action} from './action';

export interface ActionList {
  id: number;
  title: string;
  actions: Action[];
}
