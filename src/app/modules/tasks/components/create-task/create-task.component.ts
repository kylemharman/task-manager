import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'mc-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskComponent {
  constructor(public tasks: TasksService) {}
}
