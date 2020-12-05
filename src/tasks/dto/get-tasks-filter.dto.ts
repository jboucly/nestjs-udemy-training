import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TasksStatus } from '../task-status.enum';

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([TasksStatus.OPEN, TasksStatus.IN_PROGRESS, TasksStatus.DONE])
    public status: TasksStatus;

    @IsOptional()
    @IsNotEmpty()
    public search: string;
}
