import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormconfig: TypeOrmModuleOptions = {
    port: 5432,
    type: 'postgres',
    host: 'localhost',
    synchronize: true,
    username: 'postgres',
    password: 'postgres',
    database: 'taskmanagement',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
};
