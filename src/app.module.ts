import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormconfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';

@Module({
    imports: [TasksModule, TypeOrmModule.forRoot(typeormconfig)],
})
export class AppModule {}
