import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { Task, TasksStatus } from './tasks.model';

@Injectable()
export class TasksService {
    private _tasks: Task[] = [];

    public getAllTasks(): Task[] {
        return this._tasks;
    }

    public createTask(dto: CreateTasksDto): Task {
        const { title, description } = dto;

        const task: Task = {
            id: uuid.v4(),
            title,
            description,
            status: TasksStatus.OPEN,
        };

        this._tasks.push(task);
        return task;
    }

    public getTaskById(id: string): Task {
        return this._tasks.find((task) => task.id === id);
    }

    public deleteTask(id: string): void {
        this._tasks = this._tasks.filter((task: Task) => task.id !== id);
    }
}
