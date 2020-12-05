import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TasksStatus } from './tasks.model';

@Injectable()
export class TasksService {
    private _tasks: Task[] = [];

    public getAllTasks(): Task[] {
        return this._tasks;
    }

    public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }

        if (search) {
            tasks = tasks.filter((task) => task.title.includes(search) || task.description.includes(search));
        }

        return tasks;
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
        const found = this._tasks.find((task) => task.id === id);

        if (!found) {
            throw new NotFoundException(`Task with ID : ${id} not found`);
        }

        return found;
    }

    public deleteTask(id: string): void {
        const found = this.getTaskById(id);

        this._tasks = this._tasks.filter((task: Task) => task.id !== found.id);
    }

    public updateTaskStatus(id: string, status: TasksStatus): Task {
        const task = this.getTaskById(id);

        task.status = status;
        return task;
    }
}
