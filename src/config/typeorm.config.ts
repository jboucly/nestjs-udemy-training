import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig: any = config.get('db');

export const typeormconfig: TypeOrmModuleOptions = {
    port: process.env.RDS_PORT || dbConfig.port,
    type: process.env.RDS_TYPE || dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
};
