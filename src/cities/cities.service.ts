import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cities } from './entities/cities.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(Cities)
        private citiesRepository: Repository<Cities>
    ){}

    findAll(){
        try {
            return this.citiesRepository.findAndCount()
        } catch (e) {
            throw e
        }
    }

    async findOne(id: string){
        try {
            return await this.citiesRepository.findOneOrFail({
                where: {
                    id,
                },
            })
        } catch (e) {
            if (e instanceof EntityNotFoundError){
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: 'Data not found',
                    },
                    HttpStatus.NOT_FOUND,
                )
            } else {
                throw e
            }
        }
    }
}
