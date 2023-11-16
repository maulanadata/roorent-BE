import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Biodatas } from './entities/biodatas.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateBiodatasDTO } from './entities/dto/create-biodatas.dto';
import { UpdateBiodatasDTO } from './entities/dto/update-biodatas.dto';

@Injectable()
export class BiodatasService {
    constructor (
    @InjectRepository(Biodatas)
    private biodatasRepository: Repository<Biodatas>
    ) { }

    findAll(){
        return this.biodatasRepository.findAndCount();
    }

    async create(createBiodatasDTO: CreateBiodatasDTO){
        const result = await this.biodatasRepository.insert(createBiodatasDTO);

        return this.biodatasRepository.findOneOrFail({
            where: {
                id: result.identifiers[0].id
            }
        })
    }

    async findOne(id: string){
        try {
            return await this.biodatasRepository.findOneOrFail({
                where: {
                    id,
                },
            })
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: 'data not found',
                    },
                    HttpStatus.NOT_FOUND,
                );
            } else { 
                throw e;
            }
        }
    }

    async update(id: string, updateBiodatasDTO: UpdateBiodatasDTO){
        try {
            await this.biodatasRepository.findOneOrFail({
                where: {
                    id,
                },
            })
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: 'Data not found',
                    },
                    HttpStatus.NOT_FOUND,
                );
            } else {
                throw e;
            }
        }

        await this.biodatasRepository.update(id, updateBiodatasDTO);

        return this.biodatasRepository.findOneOrFail({
            where: {
                id,
            },
        });
    }
    
    async remove(id: string){
        try {
            await this.biodatasRepository.findOneOrFail({
                where: {
                    id,
                },
            });
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
                throw e;
            }
        }

        await this.biodatasRepository.delete(id);
    }
}
