import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { AppService } from '../services/app.service';
import { SupplyItem, checkIsSupplyItem } from 'src/models/app.model';
import { UpdateResult } from 'typeorm';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
    // If the body is not of the correct type, throw 400 error
    if (!checkIsSupplyItem(item))
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    // Else attempt to update the item
    return await this.appService.updateOne(id, item);
  }

  @Delete('SupplyItem/:id')
  async deleteSupplyItem(@Param('id') id: number): Promise<void> {
    return await this.appService.remove(id);
  }
}
