import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { task } from './entities/task.entity';
import { taskService } from './services/task.service';
import { taskController } from './controller/task.controller';


@Module({
    imports:[
        TypeOrmModule.forFeature([task])
    ],
    providers:[taskService],
    controllers:[taskController]
})
export class taskModule {}
