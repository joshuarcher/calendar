import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { STATUS_MESSAGE } from 'utils/statusMessages';
import HTTP_STATUS_CODES from 'utils/statusCodes';
import { RemindersService } from './reminders.service';

@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Get()
  findAll(@Query() paginationQuery) {
    // const { limit, offset } = paginationQuery;
    // TODO: set default offset and limit
    return this.remindersService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.remindersService.findOne(id);
  }

  @Post()
  create(@Body() body) {
    // when creating the service for the create method we should do server side validation
    return this.remindersService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.remindersService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.remindersService.delete(id);
  }
}
