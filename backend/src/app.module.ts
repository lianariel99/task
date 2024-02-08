import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './database/data-source';
import { taskController } from './task/controller/task.controller';
import { taskModule } from './task/task.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal:true
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    taskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {};
