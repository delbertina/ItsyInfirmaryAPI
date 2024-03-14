import { Injectable } from '@nestjs/common';
import { appDataSource } from 'src/main';
import { SupplyItem } from 'src/models/app.model';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AppService {
  findAll(take?: number, skip?: number): Promise<SupplyItem[]> {
    return appDataSource.getRepository(SupplyItem).find({ take, skip });
  }

  findOne(id: number): Promise<SupplyItem | null> {
    return appDataSource.getRepository(SupplyItem).findOneBy({ id });
  }

  updateOne(id: number, item: SupplyItem): Promise<UpdateResult> {
    return appDataSource.getRepository(SupplyItem).update(id, item);
  }

  async remove(id: number): Promise<void> {
    await appDataSource.getRepository(SupplyItem).delete(id);
  }
}
