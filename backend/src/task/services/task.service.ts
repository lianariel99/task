import { Injectable, Body, Delete, BadRequestException, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import { task } from '../entities/task.entity';
import { taskDTO } from '../dto/task.dto';



@Injectable()
export class taskService {


    constructor(
        @InjectRepository(task) private taskRep:Repository<task>,

    )
    {}

    findAll()
    {
    return  this.taskRep.find();
    }

    getId(id: number)
    {
        return this.taskRep.findOneBy({id});
    }

    async create(task: taskDTO): Promise<task> {

        
        const newTask = this.taskRep.create(task);
        return this.taskRep.save(newTask);
      }
    

    async update (id:number, body:taskDTO){
        const cafeteria = await this.taskRep.findOneBy({id});
        if (!cafeteria) {
            throw new Error('id no encontrado');
          }
          this.taskRep.merge(cafeteria, body);
          return this.taskRep.save(cafeteria);
    }


    async Delete(id:number){
        await this.taskRep.delete(id);
        return true;
    }

}