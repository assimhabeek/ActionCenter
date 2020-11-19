export declare type ActionItemStyle = 'jira' | 'slack' | 'trello' | 'default';

export interface Action {
  id: number;
  content: string;
  style: ActionItemStyle;
  date: string;
  assignedTo: number[];
}
