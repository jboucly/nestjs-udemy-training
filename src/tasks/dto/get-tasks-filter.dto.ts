import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TasksStatus } from '../tasks.model';

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([TasksStatus.OPEN, TasksStatus.IN_PROGRESS, TasksStatus.DONE])
    public status: TasksStatus;

    @IsOptional()
    @IsNotEmpty()
    public search: string;
}
