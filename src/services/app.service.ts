import { Injectable } from '@nestjs/common';
import { appDataSource } from 'src/main';
import { SupplyItem } from 'src/models/app.model';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  findAll(): Promise<SupplyItem[]> {
    return appDataSource.getRepository(SupplyItem).find();
  }

  findOne(id: number): Promise<SupplyItem | null> {
    return appDataSource.getRepository(SupplyItem).findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await appDataSource.getRepository(SupplyItem).delete(id);
  }
}
