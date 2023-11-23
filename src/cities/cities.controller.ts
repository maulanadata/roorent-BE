import { Controller, Get, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService){}

    @Get()
    async findAll(){
        const [count, data] = await this.citiesService.findAll()

        return{
            statusCode: HttpStatus.OK,
            message: 'Success',
            count,
            data,
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string){
        return {
            statusCode: HttpStatus.OK,
            message: 'success',
            data: await this.citiesService.findOne(id)
        }
    }
}
