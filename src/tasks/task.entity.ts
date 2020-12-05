import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TasksStatus } from './tasks.model';

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({})
    public title: string;

    @Column({})
    public description: string;

    @Column({})
    public status: TasksStatus;
}
