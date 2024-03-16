import { Module } from '@nestjs/common';
import { SupplyItemController } from './controllers/SupplyItem.controller';
import { SupplyItemService } from './services/SupplyItem.service';
import { SupplyItem } from './models/SupplyItem.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

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
