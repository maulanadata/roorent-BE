import { Test, TestingModule } from '@nestjs/testing';
import { ProductDescriptionsController } from './product_descriptions.controller';

describe('ProductDescriptionsController', () => {
  let controller: ProductDescriptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductDescriptionsController],
    }).compile();

    controller = module.get<ProductDescriptionsController>(ProductDescriptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
