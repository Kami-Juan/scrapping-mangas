import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import postgresqlBDConfig from './config/postgresql.config';
import commonConfig from './config/common.config';

export default ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ['.env.development', '.env.production', '.env.test'],
  load: [postgresqlBDConfig, commonConfig],
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'provision')
      .default('development'),
    PORT: Joi.number().default(3000),
    POSTGRESQL_HOST: Joi.string().required(),
    POSTGRESQL_PORT: Joi.number().required(),
    POSTGRESQL_USERNAME: Joi.string().required(),
    POSTGRESQL_PASSWORD: Joi.any().optional(),
    POSTGRESQL_DATABASE: Joi.string().required(),
    TYPE_DATABASE: Joi.string().required(),
    JWT_KEY: Joi.string().required(),
  }),
});
