import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { User } from '../auth/user.entity';
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

    public getTasks(dto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this._taskRepository.getTasks(dto, user);
    }

    public async getTaskById(id: number, user: User): Promise<Task> {
        const found = await this._taskRepository.findOne({
            where: {
                id,
                userId: user.id,
            },
        });

        if (!found) {
            throw new NotFoundException(`Task with ID : ${id} not found`);
        }

        return found;
    }

    public async createTask(dto: CreateTasksDto, user: User): Promise<Task> {
        return this._taskRepository.createTask(dto, user);
    }

    public async deleteTask(id: number, user: User): Promise<void> {
        const result: DeleteResult = await this._taskRepository.delete({
            id,
            userId: user.id,
        });

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID : ${id} not found`);
        }
    }

    public async updateTaskStatus(id: number, status: TasksStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;

        await task.save();
        return task;
    }
}
