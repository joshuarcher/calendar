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
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
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
  create(@Body() createReminderDto: CreateReminderDto) {
    // when creating the service for the create method we should do server side validation
    return this.remindersService.create(createReminderDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReminderDto: UpdateReminderDto,
  ) {
    return this.remindersService.update(id, updateReminderDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.remindersService.delete(id);
  }
}
