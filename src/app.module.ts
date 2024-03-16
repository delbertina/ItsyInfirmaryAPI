import { Module } from '@nestjs/common';
import { SupplyItemController } from './controllers/SupplyItem.controller';
import { SupplyItemService } from './services/SupplyItem.service';
import { SupplyItem } from './models/SupplyItem.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'db/sql-data.sqlite',
  synchronize: true,
  logging: true,
  entities: [SupplyItem],
  subscribers: [],
  migrations: [],
});

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql-data.sqlite',
      synchronize: true,
      entities: [SupplyItem],
    }),
  ],
  controllers: [SupplyItemController],
  providers: [SupplyItemService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
