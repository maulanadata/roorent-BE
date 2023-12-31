import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { SpecialRules } from './entities/special_rules.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityNotFoundError, Repository } from 'typeorm'
import { CreateSpecialRulesDto } from './dto/create-specialRules.dto'
import { UpdateSpecialRulesDto } from './dto/update-specialRules.dto'

@Injectable()
export class SpecialRulesService {
  constructor(
    @InjectRepository(SpecialRules)
    private specialRulesRepository: Repository<SpecialRules>,
  ) {}

  findAll() {
    return this.specialRulesRepository.findAndCount()
  }

  async create(payload: CreateSpecialRulesDto) {
    const result = await this.specialRulesRepository.insert(payload)
    return this.specialRulesRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    })
  }

  async findOne(id: string) {
    try {
      return await this.specialRulesRepository.findOneOrFail({
        where: {
          id,
        },
      })
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data Not Found',
          },
          HttpStatus.NOT_FOUND,
        )
      } else {
        throw err
      }
    }
  }

  async update(id: string, payload: UpdateSpecialRulesDto) {
    try {
      await this.specialRulesRepository.findOneOrFail({
        where: {
          id,
        },
      })
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data Not Found',
          },
          HttpStatus.NOT_FOUND,
        )
      } else {
        throw err
      }
    }
    await this.specialRulesRepository.update(id, payload)
    return this.specialRulesRepository.findOneOrFail({
      where: {
        id,
      },
    })
  }

  async remove(id: string) {
    try {
      await this.specialRulesRepository.findOneOrFail({
        where: {
          id,
        },
      })
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data Not Found',
          },
          HttpStatus.NOT_FOUND,
        )
      } else {
        throw err
      }
    }
    await this.specialRulesRepository.softDelete(id)
  }
}
