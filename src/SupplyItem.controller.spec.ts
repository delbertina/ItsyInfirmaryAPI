import { Test, TestingModule } from '@nestjs/testing';
import { SupplyItemController } from './controllers/SupplyItem.controller';
import { STARTER_SUPPLY_ITEMS } from './data/StarterSupplyItems';
import { SupplyItemService } from './services/SupplyItem.service';
import { INestApplication } from '@nestjs/common';
import { SupplyItem } from './models/SupplyItem.model';

const mockSupplyItemService = {
  findAll: jest
    .fn()
    .mockImplementation((take?: number, skip?: number) =>
      STARTER_SUPPLY_ITEMS.slice(skip ?? 0, (skip ?? 0) + (take ?? 0) + 1),
    ),
  findOne: jest
    .fn()
    .mockImplementation((id: number) =>
      STARTER_SUPPLY_ITEMS.find((item) => item.id === id),
    ),
  updateOne: jest.fn().mockResolvedValue((item: SupplyItem) => item),
  saveOne: jest.fn().mockImplementation((item: SupplyItem) => {
    item.id = STARTER_SUPPLY_ITEMS[-1].id + 1;
    return item;
  }),
  deleteOne: jest.fn().mockImplementation((id: number) => {
    const foundItem = STARTER_SUPPLY_ITEMS.find(
      (item: SupplyItem) => item.id === id,
    );
    if (!!foundItem) {
      return { affected: 1, raw: '' };
    } else {
      throw new Error();
    }
  }),
};

describe('SupplyItemController', () => {
  let testApp: INestApplication;
  let supplyItemController: SupplyItemController;
  let supplyItemService: SupplyItemService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SupplyItemController],
      providers: [
        {
          provide: SupplyItemService,
          useValue: mockSupplyItemService,
        },
      ],
    }).compile();

    testApp = app.createNestApplication();
    supplyItemController = app.get<SupplyItemController>(SupplyItemController);
    supplyItemService = app.get<SupplyItemService>(SupplyItemService);
    await testApp.init();
  });

  describe('getSupplyItem', () => {
    it('should return a supply item', async () => {
      const result = await supplyItemController.getSupplyItem(1);
      expect(supplyItemService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(STARTER_SUPPLY_ITEMS[0]);
    });
  });
});
