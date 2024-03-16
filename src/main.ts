import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { SupplyItem } from './models/SupplyItem.model';
import { STARTER_SUPPLY_ITEMS } from './data/StarterSupplyItems';

const APP_PORT = 3000;

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'db/sql-data.sqlite',
  synchronize: true,
  logging: true,
  entities: [SupplyItem],
  subscribers: [],
  migrations: [],
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(APP_PORT);
  console.log(`API Listening on port: ${APP_PORT}`);

  await appDataSource.initialize();

  //
  // Stuff the database
  //
  const supplyItemRepo = appDataSource.getRepository(SupplyItem);
  const supplyItemCount = await supplyItemRepo.count();
  // If there's nothing in the table, add it.
  if (!supplyItemCount) {
    await STARTER_SUPPLY_ITEMS.forEach(
      async (item) => await supplyItemRepo.save(item),
    );
  }
}
bootstrap();
