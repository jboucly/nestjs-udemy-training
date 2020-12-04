import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private _service: TasksService) {}

    @Get()
    public getAllTasks(): Task[] {
        return this._service.getAllTasks();
    }

    @Get('/:id')
    public getTaskById(@Param('id') id: string): Task {
        return this._service.getTaskById(id);
    }

    @Post()
    public createTask(@Body() dto: CreateTasksDto): Task {
        return this._service.createTask(dto);
    }

    @Delete('/:id')
    public deleteTask(@Param('id') id: string): void {
        this._service.deleteTask(id);
    }
}
