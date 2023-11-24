import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Levels } from './entities/level.entity'
import { EntityNotFoundError, Repository } from 'typeorm'

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(Levels)
    private levelsRepository: Repository<Levels>,
  ) {}

  findAll() {
    try {
      return this.levelsRepository.findAndCount()
    } catch (err) {
      throw err
    }
  }

  async findOne(id: string) {
    try {
      return await this.levelsRepository.findOneOrFail({
        where: {
          id,
        },
      })
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        )
      } else {
        throw err
      }
    }
  }

  async findOneName(name: string) {
    try {
      return await this.levelsRepository.findOneOrFail({
        where: {
          name,
        },
      })
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        )
      } else {
        throw err
      }
    }
  }
}
