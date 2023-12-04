import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorits } from './entities/favorits.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritsService {
    constructor(
        @InjectRepository(Favorits)
        private favoritRepository: Repository<Favorits>,
    ){}

    findAll(page: number = 1, limit: number = 10){
        return this.favoritRepository.findAndCount({
            skip: --page*limit,
            take: limit,
            relations: {
                user: true,
                product: true
            }
        })
    }

    
}
