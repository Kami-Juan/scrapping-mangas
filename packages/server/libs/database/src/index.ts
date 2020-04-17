import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';

import ConfigModule from '@settings'

export default TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('postgresql.host'),
    port: configService.get<number>('postgresql.port'),
    username: configService.get<string>('postgresql.username'),
    password: configService.get<string>('postgresql.password'),
    database: configService.get<string>('postgresql.database'),
    entities: [UserEntity],
    synchronize: configService.get<string>('env') === 'development' ? true : false,
  }),
  inject: [ConfigService],
})