import {Component, Input, OnInit} from '@angular/core';
import {Action} from '../model/action';

@Component({
  selector: 'app-action-item',
  templateUrl: './action-item.component.html',
  styleUrls: ['./action-item.component.scss']
})
export class ActionItemComponent implements OnInit {

  @Input() action: Action;

  public editMode: boolean;

  public editedDescription: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  initForm(): void {
    this.editedDescription = this.action.description;
    this.editMode = true;
  }

  onSubmit($event): void {
    if ($event.valid) {
      this.action.description = this.editedDescription;
      this.editMode = false;
    }
  }

  onCancel($event): void {
    $event.resetForm({description: this.action.description});
    this.editMode = false;
  }

}
