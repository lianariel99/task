import { IsString } from "class-validator";


export class taskDTO{

    id:number;
    
    @IsString()
    title:string;

    state:boolean;
}