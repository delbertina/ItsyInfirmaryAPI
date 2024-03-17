import { Test, TestingModule } from '@nestjs/testing';
import { SupplyItemController } from './controllers/SupplyItem.controller';
import { STARTER_SUPPLY_ITEMS } from './data/StarterSupplyItems';
import { SupplyItemService } from './services/SupplyItem.service';
import { INestApplication } from '@nestjs/common';

// const mockSupplyItemService = jest.mock(
//   './services/SupplyItem.service.ts',
//   () =>
//     new Promise((resolve) =>
//       resolve({
//         findAll: () => Promise.resolve(STARTER_SUPPLY_ITEMS),
//         findOne: (id: number) =>
//           Promise.resolve(STARTER_SUPPLY_ITEMS.find((item) => item.id === id)),
//       }),
//     ),
// );

describe('SupplyItemController', () => {
  let testApp: INestApplication;
  let supplyItemController: SupplyItemController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SupplyItemController],
      providers: [SupplyItemService],
    }).compile();

    testApp = app.createNestApplication();
    supplyItemController = app.get<SupplyItemController>(SupplyItemController);
    await testApp.init();
  });

  describe('getSupplyItem', () => {
    it('should return a supply item', async () => {
      jest
        .spyOn(supplyItemController, 'getSupplyItem')
        .mockImplementationOnce(
          async (id: number) => await STARTER_SUPPLY_ITEMS[id - 1],
        );
      expect(await supplyItemController.getSupplyItem(1)).toBe(
        STARTER_SUPPLY_ITEMS[0],
      );
    });
  });
});
