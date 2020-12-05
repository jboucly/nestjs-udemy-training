import { IsNotEmpty } from 'class-validator';

export class CreateTasksDto {
    @IsNotEmpty()
    public title: string;

    @IsNotEmpty()
    public description: string;
}
