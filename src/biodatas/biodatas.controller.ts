import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BiodatasService } from './biodatas.service';
import { CreateBiodatasDTO } from './dto/create-biodatas.dto';
import { UpdateBiodatasDTO } from './dto/update-biodatas.dto';

@Controller('biodatas')
export class BiodatasController {
  constructor(private readonly biodatasService: BiodatasService) {}

  @Get()
  async getAll() {
    const [data, count] = await this.biodatasService.findAll();

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      count,
      data,
    };
  }

  @Post()
  async create(@Body() payload: CreateBiodatasDTO) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'success',
      data: await this.biodatasService.create(payload),
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      stausCode: HttpStatus.OK,
      message: 'success',
      data: await this.biodatasService.findOne(id),
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateBiodatasDTO,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: await this.biodatasService.update(id, payload),
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.biodatasService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'succes',
    };
  }
}
