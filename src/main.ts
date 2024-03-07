import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { SupplyItem } from './models/app.model';

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
  console.log(`supply item count: ${supplyItemCount}`);
  if (!supplyItemCount) {
    const napkinItem = new SupplyItem();
    napkinItem.name = 'Napkin';
    napkinItem.description =
      'Plain white 2-ply somewhat absorbant paper product.';
    napkinItem.perishable = false;
    await supplyItemRepo.save(napkinItem);
  }
  const supplyItemCount2 = await supplyItemRepo.count();
  console.log(`supply item count: ${supplyItemCount2}`);
}
bootstrap();
