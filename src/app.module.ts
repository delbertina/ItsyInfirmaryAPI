import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { SupplyItem } from './models/app.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql-data.sqlite',
      synchronize: true,
      entities: [SupplyItem],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
