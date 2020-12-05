import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    private _logger = new Logger('TaskRepository');

    public async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        query.where('task.userId = :userId', { userId: user.id });

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
        }

        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            this._logger.error(
                `Failed to get tasks for user "${user.username}", DTO: ${JSON.stringify(filterDto)}`,
                error.stack,
            );
            throw new InternalServerErrorException();
        }
    }

    public async createTask(dto: CreateTasksDto, user: User): Promise<Task> {
        const { title, description } = dto;
        const task = new Task();

        task.title = title;
        task.description = description;
        task.status = TasksStatus.OPEN;
        task.user = user;

        try {
            await task.save();
        } catch (error) {
            this._logger.error(
                `Failed to create a task for user "${user.username}", DTO: ${JSON.stringify(dto)}`,
                error.stack,
            );
            throw new InternalServerErrorException();
        }

        delete task.user;
        return task;
    }
}
