import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put, Delete } from '@nestjs/common';
import { SpecialRulesService } from './special_rules.service';
import { CreateSpecialRulesDto } from './dto/create-specialRules.dto';
import { UpdateSpecialRulesDto } from './dto/update-specialRules.dto';

@Controller('special-rules')
export class SpecialRulesController {
    constructor(private readonly specialRulesService: SpecialRulesService){}

    @Get()
    async findAll(){
        const[data, count] = await this.specialRulesService.findAll();
        return{
            data, 
            count,
            statusCode: HttpStatus.OK,
            message: 'succes'
        };
    }

    @Post()
    async create(@Body() createSpecialRulesDto: CreateSpecialRulesDto ){
        return{
            data: await this.specialRulesService.create(createSpecialRulesDto),
            statusCode: HttpStatus.CREATED,
            message: 'succes'
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id:string){
        return{
            data: await this.specialRulesService.findOne(id),
            statusCode: HttpStatus.OK,
            message: 'succes'
        }
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateSpecialRulesDto: UpdateSpecialRulesDto){
        return{
            data: await this.specialRulesService.update(id, updateSpecialRulesDto),
            statusCode: HttpStatus.OK,
            message: 'succes'
        }
    }

    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string){
        await this.specialRulesService.remove(id)
        return{
            statusCode: HttpStatus.OK,
            message: 'succes'
        }
    }
}
