import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { DataSource } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { ConfigService } from '@nestjs/config';
import { Levels } from '#/levels/entities/level.entity';
import { levelMasterData } from './data/level';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  private logger = new Logger(SeederService.name);

  constructor(
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {}

  private async insertIfNotExist<Entity extends ObjectLiteral>(
    entity: EntityTarget<Entity>,
    data: Entity[],
  ) {
    for (const datas of data) {
      const existingRecord = await this.dataSource.manager.findOne(entity, {
        where: datas,
      });

      if (!existingRecord) {
        await this.dataSource
          .createQueryBuilder()
          .insert()
          .into(entity)
          .values(datas)
          .execute();
      }
    }
  }

  async seeder() {
    await this.insertIfNotExist(Levels, levelMasterData);
  }

  async onApplicationBootstrap() {
    if (this.configService.get('env') === 'development') {
      await this.seeder();
      this.logger.log('Seeder run successfully');
    }
  }
}
