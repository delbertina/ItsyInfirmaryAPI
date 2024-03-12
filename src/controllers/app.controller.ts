import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { SupplyItem } from 'src/models/app.model';
import { UpdateResult } from 'typeorm';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('SupplyItem/:id')
  async getSupplyItem(@Param('id') id: number): Promise<SupplyItem | null> {
    return await this.appService.findOne(id);
  }

  @Get('SupplyItemList/')
  async getSupplyItemList(): Promise<Array<SupplyItem>> {
    return await this.appService.findAll();
  }

  @Put('SupplyItem/:id')
  async updateSupplyItem(
    @Param('id') id: number,
    @Body() item: SupplyItem,
  ): Promise<UpdateResult> {
    return await this.appService.updateOne(id, item);
  }

  @Delete('SupplyItem/:id')
  async deleteSupplyItem(@Param('id') id: number): Promise<void> {
    return await this.appService.remove(id);
  }
}
