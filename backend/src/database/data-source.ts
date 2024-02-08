import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";




ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV}.env` ,
});


export const configService = new ConfigService();

export const DataSourceConfig:DataSourceOptions =
{
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: String(configService.get('DB_PASSWORD')),
  database: configService.get<string>('DB_DATABASE'),
  synchronize: false,
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
  logging: false,
  migrationsRun:true,
  namingStrategy: new SnakeNamingStrategy(),

};


export const AppDS =   new DataSource(DataSourceConfig);




