import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SupplyItemService } from '../services/SupplyItem.service';
import { SupplyItem, checkIsSupplyItem } from 'src/models/SupplyItem.model';
import { UpdateResult } from 'typeorm';

@Controller()
export class SupplyItemController {
  constructor(private readonly supplyItemService: SupplyItemService) {}

  @Get('SupplyItem/:id')
  async getSupplyItem(@Param('id') id: number): Promise<SupplyItem | null> {
    return await this.supplyItemService.findOne(id);
  }

  @Get('SupplyItemList/')
  async getSupplyItemList(
    @Query('take') take: number,
    @Query('skip') skip: number,
  ): Promise<Array<SupplyItem>> {
    return await this.supplyItemService.findAll(
      !take || take > 25 ? 25 : take,
      skip,
    );
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
    return await this.supplyItemService.updateOne(id, item);
  }

  @Post('SupplyItem/')
  async addSupplyItem(@Body() item: SupplyItem): Promise<SupplyItem> {
    // If the body is not of the correct type, throw 400 error
    if (!checkIsSupplyItem(item))
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    // Else attempt to save the item
    return await this.supplyItemService.saveOne(item);
  }

  @Delete('SupplyItem/:id')
  async deleteSupplyItem(@Param('id') id: number): Promise<void> {
    return await this.supplyItemService.remove(id);
  }
}
