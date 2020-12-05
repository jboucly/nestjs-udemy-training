import { EntityRepository, Repository } from 'typeorm';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    public async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
        }

        const tasks = await query.getMany();
        return tasks;
    }

    public async createTask(dto: CreateTasksDto): Promise<Task> {
        const { title, description } = dto;
        const task = new Task();

        task.title = title;
        task.description = description;
        task.status = TasksStatus.OPEN;

        await task.save();
        return task;
    }
}
