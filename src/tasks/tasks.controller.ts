import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TasksStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private _service: TasksService) {}

    @Get()
    public getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this._service.getTasks(filterDto);
    }

    @Get('/:id')
    public getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this._service.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    public createTask(@Body() dto: CreateTasksDto): Promise<Task> {
        return this._service.createTask(dto);
    }

    @Delete('/:id')
    public deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this._service.deleteTask(id);
    }

    @Patch('/:id/status')
    public updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TasksStatus,
    ): Promise<Task> {
        return this._service.updateTaskStatus(id, status);
    }
}
