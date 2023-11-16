import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Biodatas } from './entities/biodatas.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateBiodatasDTO } from './dto/create-biodatas.dto';
import { UpdateBiodatasDTO } from './dto/update-biodatas.dto';

@Injectable()
export class BiodatasService {
  constructor(
    @InjectRepository(Biodatas)
    private biodatasRepository: Repository<Biodatas>,
  ) {}

  findAll() {
    return this.biodatasRepository.findAndCount();
  }

  async create(payload: CreateBiodatasDTO) {
    const result = await this.biodatasRepository.insert(payload);

    return this.biodatasRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.biodatasRepository.findOneOrFail({
        where: {
          id,
        },
      });
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

  async update(id: string, payload: UpdateBiodatasDTO) {
    try {
      await this.biodatasRepository.findOneOrFail({
        where: {
          id,
        },
      });
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

    await this.biodatasRepository.update(id, payload);

    return this.biodatasRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.biodatasRepository.findOneOrFail({
        where: {
          id,
        },
      });
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

    await this.biodatasRepository.softDelete(id);
  }
}
