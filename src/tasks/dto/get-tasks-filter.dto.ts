import { TasksStatus } from '../tasks.model';

export class GetTasksFilterDto {
    public status: TasksStatus;

    public search: string;
}
