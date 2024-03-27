import { Test, TestingModule } from '@nestjs/testing';
import { SupplyItemController } from './controllers/SupplyItem.controller';
import { STARTER_SUPPLY_ITEMS } from './data/StarterSupplyItems';
import { SupplyItemService } from './services/SupplyItem.service';
import { HttpException, INestApplication } from '@nestjs/common';
import { SupplyItem } from './models/SupplyItem.model';

const mockSupplyItemService = {
  findAll: jest
    .fn()
    .mockImplementation((take?: number, skip?: number) =>
      STARTER_SUPPLY_ITEMS.slice(skip ?? 0, (skip ?? 0) + (take ?? 0)),
    ),
  findOne: jest
    .fn()
    .mockImplementation((id: number) =>
      STARTER_SUPPLY_ITEMS.find((item) => item.id === id),
    ),
  updateOne: jest.fn().mockResolvedValue((item: SupplyItem) => item),
  saveOne: jest.fn().mockImplementation((item: SupplyItem) => {
    item.id = STARTER_SUPPLY_ITEMS[STARTER_SUPPLY_ITEMS.length - 1].id + 1;
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

  describe('addSupplyItem', () => {
    it('should return an error with invalid supply item with no properties', async () => {
      expect(async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await supplyItemController.addSupplyItem({});
      }).rejects.toThrow(HttpException);
    });
  });

  describe('addSupplyItem', () => {
    it('should return an error with invalid supply item with missing property', async () => {
      expect(async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await supplyItemController.addSupplyItem({ id: 1, name: 'test item' });
      }).rejects.toThrow(HttpException);
    });
  });

  describe('addSupplyItem', () => {
    it('should return item back when add valid item', async () => {
      const result = await supplyItemController.addSupplyItem({
        id: 1,
        name: 'test item',
        description: 'test stuff',
        perishable: false,
      });
      expect(supplyItemService.saveOne).toHaveBeenCalled();
      expect(result.id).not.toEqual(1);
    });
  });

  describe('getSupplyItemList', () => {
    it('should return 25 supply items by default', async () => {
      const result = await supplyItemController.getSupplyItemList();
      expect(supplyItemService.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(25);
    });
  });

  describe('getSupplyItemList', () => {
    it('should return 25 supply items max', async () => {
      const result = await supplyItemController.getSupplyItemList(30);
      expect(supplyItemService.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(25);
    });
  });

  describe('getSupplyItemList', () => {
    it('should return 5 supply items when take 5', async () => {
      const result = await supplyItemController.getSupplyItemList(5);
      expect(supplyItemService.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(5);
    });
  });

  describe('getSupplyItemList', () => {
    it('should return the 6th supply items when take 5 and skip 5', async () => {
      const result = await supplyItemController.getSupplyItemList(5, 5);
      expect(supplyItemService.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(5);
      expect(result[0].id).toEqual(6);
    });
  });
});
