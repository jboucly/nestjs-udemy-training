import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private _taskRepository: TaskRepository,
    ) {}

    public getTasks(dto: GetTasksFilterDto): Promise<Task[]> {
        return this._taskRepository.getTasks(dto);
    }

    public async getTaskById(id: number): Promise<Task> {
        const found = await this._taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with ID : ${id} not found`);
        }

        return found;
    }

    public async createTask(dto: CreateTasksDto): Promise<Task> {
        return this._taskRepository.createTask(dto);
    }

    public async deleteTask(id: number): Promise<void> {
        const result: DeleteResult = await this._taskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID : ${id} not found`);
        }
    }

    public async updateTaskStatus(id: number, status: TasksStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;

        await task.save();
        return task;
    }
}
