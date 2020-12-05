import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TasksStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [TasksStatus.OPEN, TasksStatus.IN_PROGRESS, TasksStatus.DONE];

    public transform(value: any): any {
        value = value.toUpperCase();
        if (!this._isStatusValid(value)) {
            throw new BadRequestException(`${value} is an invalid status`);
        }

        return value;
    }

    private _isStatusValid(status: any): boolean {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}
