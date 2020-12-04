import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private _service: TasksService) {}

    @Get()
    public getAllTasks(): Task[] {
        return this._service.getAllTasks();
    }

    @Post()
    public createTask(@Body('title') title: string, @Body('description') description: string): Task {
        return this._service.createTask(title, description);
    }
}
