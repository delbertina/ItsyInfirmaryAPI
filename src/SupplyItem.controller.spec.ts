import { Test, TestingModule } from '@nestjs/testing';
import { SupplyItemController } from './controllers/SupplyItem.controller';
import { STARTER_SUPPLY_ITEMS } from './data/StarterSupplyItems';
import { SupplyItemService } from './services/SupplyItem.service';

const mockSupplyItemService = jest.mock(
  './services/SupplyItem.service.ts',
  () =>
    new Promise((resolve) =>
      resolve({
        findAll: () => Promise.resolve(STARTER_SUPPLY_ITEMS),
        findOne: (id: number) =>
          Promise.resolve(STARTER_SUPPLY_ITEMS.find((item) => item.id === id)),
      }),
    ),
);

describe('SupplyItemController', () => {
  let supplyItemController: SupplyItemController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SupplyItemController],
      providers: [SupplyItemService],
    })
      .overrideProvider(SupplyItemService)
      .useValue(mockSupplyItemService)
      .compile();

    supplyItemController = app.get<SupplyItemController>(SupplyItemController);
  });

  describe('getSupplyItem', () => {
    it('should return a supply item', async () => {
      expect(await supplyItemController.getSupplyItem(1)).toBe(
        STARTER_SUPPLY_ITEMS[0],
      );
    });
  });
});
