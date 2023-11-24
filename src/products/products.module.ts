import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './enitities/products.entity';
import { UsersModule } from '#/users/users.module';
import { CitiesModule } from '#/cities/cities.module';
import { ProductDescriptionsModule } from '#/product_descriptions/product_descriptions.module';
import { SpecialRulesModule } from '#/special_rules/special_rules.module';
import { Cities } from '#/cities/entities/cities.entity';
import { Users } from '#/users/entities/user.entity';
import { SpecialRules } from '#/special_rules/entities/special_rules.entity';
import { ProductDescriptions } from '#/product_descriptions/entities/product_descriptions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Cities]), 
  UsersModule, CitiesModule, ProductDescriptionsModule, SpecialRulesModule, ProductsModule
],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService]
})
export class ProductsModule {}
