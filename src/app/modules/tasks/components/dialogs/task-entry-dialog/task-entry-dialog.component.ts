import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ITask } from 'src/app/core/models/task';
import { WithRef } from 'src/app/shared/helpers/firebase';
import {
  filterUndefined,
  findProp,
  snapshot,
} from 'src/app/shared/helpers/rxjs';
import { TasksService } from '../../../tasks.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'mc-task-entry-dialog',
  template: ``,
})
export class TaskEntryDialogComponent {
  task$: Observable<WithRef<ITask>>;

  constructor(
    private _dialog: MatDialog,
    private _task: TasksService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.task$ = this._route.data.pipe(
      findProp<WithRef<ITask>>('task'),
      filterUndefined()
    );

    this.openTaskDialog();
  }

  async openTaskDialog(): Promise<void> {
    const task = await this._dialog
      .open(TaskDialogComponent, {
        height: '100%',
        width: '100%',
        maxWidth: '95vw',
        maxHeight: '90vh',
        autoFocus: false,
        data: await snapshot(this.task$),
      })
      .afterClosed()
      .toPromise();

    if (!task) {
      await this._navigateBack();
      return;
    }
    await this._task.updateTask(task);
    await this._navigateBack();
  }

  private async _navigateBack(): Promise<void> {
    await this._router.navigate(['../'], { relativeTo: this._route });
  }
}