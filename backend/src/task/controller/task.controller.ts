import { Body, Controller, Delete, Get, Param, Post, Put, HttpStatus,HttpException } from '@nestjs/common';
import { taskService } from '../services/task.service';
import { taskDTO } from '../dto/task.dto';


@Controller('api/task')
export class taskController {

    constructor(
        private taskService:taskService
    )
    
    {}

    @Get()
    getAll(){
        return this.taskService.findAll();
    }
    
    @Get(':id')
    getOne(@Param('id') id : number){
        return this.taskService.getId(id);
    }

    @Post()
    async create(@Body() taskDTO:taskDTO){

            return await this.taskService.create(taskDTO);

        }

    

    @Put(':id')
    update(@Param('id') id:number, @Body() body:any)
    {return this.taskService.update(id,body)}


    @Delete(':id')
    delete(@Param('id') id:number){
        return this.taskService.Delete(id);
    }

}