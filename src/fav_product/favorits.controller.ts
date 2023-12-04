import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { FavoritsService } from './favorits.service';

@Controller('favorit')
export class FavoritsController {
    constructor(private favoritService: FavoritsService){}

    @Get()
    async findAll(@Query('page')page: number, @Query('limit') limit: number){
        const [data, count] = await this.favoritService.findAll(page,limit)
        return {
            statusCode: HttpStatus.OK,
            message: 'Success',
            count,
            data
        }
    }

   
}
