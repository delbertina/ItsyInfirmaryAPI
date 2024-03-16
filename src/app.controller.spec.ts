import { Test, TestingModule } from '@nestjs/testing';
import { SupplyItemController } from './controllers/SupplyItem.controller';
import { SupplyItemService } from './services/SupplyItem.service';

describe('SupplyItemController', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let supplyItemController: SupplyItemController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SupplyItemController],
      providers: [SupplyItemService],
    }).compile();

    supplyItemController = app.get<SupplyItemController>(SupplyItemController);
  });

  // need to update tests for the new methods
  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(supplyItemController.getHello()).toBe('Hello World!');
  //   });
  // });
});
