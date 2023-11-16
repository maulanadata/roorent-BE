import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { BiodatasService } from './biodatas.service';
import { CreateBiodatasDTO } from './entities/dto/create-biodatas.dto';
import { UpdateBiodatasDTO } from './entities/dto/update-biodatas.dto';

@Controller('biodatas')
export class BiodatasController {
    constructor(private readonly biodatasService: BiodatasService){}
    
    @Get()
    async getAll(){
        const [data, count] = await this.biodatasService.findAll();

        return {
            data,
            count,
            statusCode: HttpStatus.OK,
            message: 'success',
        };
    }

    @Post()
    async create(@Body() createBiodatasDTO: CreateBiodatasDTO){
        return {
            data: await this.biodatasService.create(createBiodatasDTO),
            statusCode: HttpStatus.CREATED,
            message: 'success',
        }
    }
    
    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string){
        return {
            data: await this.biodatasService.findOne(id),
            stausCode: HttpStatus.OK,
            message: 'success',
        }
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string,
    @Body() updateBiodatasDTO: UpdateBiodatasDTO,
    ){
        return {
            data: await this.biodatasService.update(id, updateBiodatasDTO),
            statusCode: HttpStatus.OK,
            message: 'success',
        };
    }

    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id:string){
        await this.biodatasService.remove(id);

        return {
            statusCode: HttpStatus.OK,
            message: 'succes',
        };
    }
}
