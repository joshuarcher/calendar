import { Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { STATUS_MESSAGE } from 'utils/statusMessages';
import HTTP_STATUS_CODES from 'utils/statusCodes';

@Controller('reminders')
export class RemindersController {
  @Get()
  findAll() {
    return {
      status: STATUS_MESSAGE.READ,
      statusCode: HTTP_STATUS_CODES.OK,
      body: 'All Reminders',
    };
  }
  @Get(':id')
  findOne(@Param() params) {
    return {
      status: STATUS_MESSAGE.READ,
      statusCode: HTTP_STATUS_CODES.OK,
      body: `Found Reminder with id ${params.id}`,
    };
  }

  @Post()
  create() {
    return {
      status: STATUS_MESSAGE.CREATED,
      statusCode: HTTP_STATUS_CODES.CREATED,
      body: `created reminder with new id`,
    };
  }

  @Patch(':id')
  update(@Param() params) {
    return {
      status: STATUS_MESSAGE.UPDATED,
      statusCode: HTTP_STATUS_CODES.OK,
      body: `updated reminder with ${params.id}`,
    };
  }

  @Delete(':id')
  delete(@Param() params) {
    return {
      status: STATUS_MESSAGE.DELETED,
      statusCode: HTTP_STATUS_CODES.OK,
      body: `deleted reminder with ${params.id}`,
    };
  }
}
