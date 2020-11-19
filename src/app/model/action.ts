export declare type ActionItemType = 'jira' | 'slack' | 'trello' | 'default';
export declare type JiraActionItemType = 'story' | 'task' | 'bug';

export interface Action {
  id: number;
  content: string;
  type: ActionItemType;
  date: string;
  assignedTo: number[];
  jiraActionItemType?: JiraActionItemType;
}
