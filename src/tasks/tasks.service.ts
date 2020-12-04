import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { Task, TasksStatus } from './tasks.model';

@Injectable()
export class TasksService {
    private _tasks: Task[] = [];

    public getAllTasks(): Task[] {
        return this._tasks;
    }

    public createTask(title: string, description: string): Task {
        const task: Task = {
            id: uuid.v4(),
            title,
            description,
            status: TasksStatus.OPEN,
        };

        this._tasks.push(task);
        return task;
    }
}
