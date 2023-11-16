import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { Levels } from '#/levels/entities/level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Levels])],
  providers: [SeederService],
})
export class SeederModule {}
