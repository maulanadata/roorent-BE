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
import { ReviewsService } from './reviews.service';
import { CreateReviewDTO } from './dto/create-review.dto';
import { UpdateReviewDTO } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Get()
  async getAllReviews() {
    const [data, count] = await this.reviewService.findAll();

    return {
      statusCode: HttpStatus.OK,
      messae: 'Success',
      data,
      count,
    };
  }

  @Get(':id')
  async getReviewById(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.reviewService.findOne(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data,
    };
  }

  @Post()
  async createReview(@Body() paload: CreateReviewDTO) {
    const datas = await this.reviewService.create(paload);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Success',
      data: datas,
    };
  }

  @Put(':id')
  async updateReview(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() paload: UpdateReviewDTO,
  ) {
    const datas = await this.reviewService.update(id, paload);

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: datas,
    };
  }

  @Delete(':id')
  async deleteReview(@Param('id', ParseUUIDPipe) id: string) {
    const datas = await this.reviewService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: datas,
    };
  }
}
