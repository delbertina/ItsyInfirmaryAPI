import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource, Repository } from 'typeorm';
import { SupplyItem } from './models/app.model';

const APP_PORT = 3000;

const STARTER_SUPPLY_ITEMS: Array<SupplyItem> = [
  {
    id: 1,
    name: 'Napkin',
    description: 'Plain white 2-ply somewhat absorbant paper product.',
    perishable: false,
  },
  {
    id: 2,
    name: 'Pencil',
    description: 'Small wooden writing untencil',
    perishable: false,
  },
  {
    id: 3,
    name: 'Paper',
    description: 'Stiff white paper product. Good for writing on.',
    perishable: false,
  },
];

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
    STARTER_SUPPLY_ITEMS.forEach(
      async (item) => await addSupplyItem(supplyItemRepo, item),
    );
  }
}

async function addSupplyItem(repo: Repository<SupplyItem>, item: SupplyItem) {
  const newItem = new SupplyItem();
  newItem.name = item.name;
  newItem.description = item.description;
  newItem.perishable = item.perishable;
  await repo.save(newItem);
}
bootstrap();
