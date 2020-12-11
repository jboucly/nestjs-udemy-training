import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { User } from '../auth/user.entity';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockUser: User = {
    id: 12,
    username: 'Test user',
    password: 'TestPassword',
    salt: 'RANDOM',
    tasks: [new Task()],
} as User;

const mockTask: Task = {
    id: 143,
    description: 'Test mock task',
    status: TasksStatus.IN_PROGRESS,
    title: 'Test title',
    user: mockUser,
    userId: mockUser.id,
} as Task;

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
    createTask: jest.fn(),
    delete: jest.fn(),
});

describe('TasksService', () => {
    let tasksService;
    let taskRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                {
                    provide: TaskRepository,
                    useFactory: mockTaskRepository,
                },
            ],
        }).compile();

        tasksService = module.get<TasksService>(TasksService);
        taskRepository = module.get<TaskRepository>(TaskRepository);
    });

    describe('GetTasks', () => {
        it('Gets all tasks from the repository', async () => {
            taskRepository.getTasks.mockResolvedValue(mockTask);

            expect(taskRepository.getTasks).not.toHaveBeenCalled();

            const filters: GetTasksFilterDto = { search: 'Some search', status: TasksStatus.IN_PROGRESS };
            const result = await tasksService.getTasks(filters, mockUser as User);

            expect(taskRepository.getTasks).toHaveBeenCalled();
            expect(result).toEqual(mockTask);
        });
    });

    describe('GetTaskById', () => {
        it('Calls taskRepository.findOne() and successfully retrieve and return the task', async () => {
            taskRepository.findOne.mockResolvedValue(mockTask);

            const result = await tasksService.getTaskById(1, mockUser);

            expect(result).toEqual(mockTask);
            expect(taskRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id: 1,
                    userId: mockUser.id,
                },
            });
        });

        it('Thrws an error as task not found', () => {
            taskRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow(NotFoundException);
        });
    });

    describe('CreateTask', () => {
        it('Calls taskRepository.create() as null', async () => {
            taskRepository.createTask.mockResolvedValue(null);
            const result = await tasksService.createTask(null, null);

            expect(taskRepository.createTask).toHaveBeenCalled();
            expect(result).toEqual(null);
        });

        it('Calls taskRepository.create() and returns the result', async () => {
            taskRepository.createTask.mockResolvedValue(mockTask);
            const createTaskDto: CreateTasksDto = { title: 'Test mock task', description: 'Test title' };

            expect(taskRepository.createTask).not.toHaveBeenCalled();

            const result = await tasksService.createTask(createTaskDto, mockUser);
            expect(taskRepository.createTask).toHaveBeenCalledWith(createTaskDto, mockUser);

            expect(result).toEqual(mockTask);
        });
    });

    describe('DeleteTask', () => {
        it('Calls taskRepository.deleteTak() to delte a task', async () => {
            taskRepository.delete.mockResolvedValue({ affected: 1 });
            expect(taskRepository.delete).not.toHaveBeenCalled();

            await tasksService.deleteTask(mockTask.id, mockUser);
            expect(taskRepository.delete).toHaveBeenCalledWith({ id: mockTask.id, userId: mockUser.id });
        });

        it('Throws an error as task could not be found', () => {
            taskRepository.delete.mockResolvedValue({ affected: 0 });
            expect(tasksService.deleteTask(1, mockUser)).rejects.toThrow(NotFoundException);
        });
    });

    describe('UpdateTaskStatus', () => {
        it('Update task status', async () => {
            const save = jest.fn().mockResolvedValue(true);
            tasksService.getTaskById = jest.fn().mockResolvedValue({
                status: TasksStatus.OPEN,
                save,
            });

            expect(tasksService.getTaskById).not.toHaveBeenCalled();
            expect(save).not.toHaveBeenCalled();

            const result = await tasksService.updateTaskStatus(mockTask.id, TasksStatus.DONE, mockUser);

            expect(tasksService.getTaskById).toHaveBeenCalled();
            expect(save).toHaveBeenCalled();
            expect(result.status).toEqual(TasksStatus.DONE);
        });
    });
});
