import { Injectable } from '@nestjs/common';
import HTTP_STATUS_CODES from 'utils/statusCodes';
import { STATUS_MESSAGE } from 'utils/statusMessages';
import { Reminder } from './entities/reminder.entity';

@Injectable()
export class RemindersService {
  private reminders: Reminder[] = [
    {
      id: '1',
      title: 'Reminder 1',
    },
  ];

  findAll() {
    return {
      status: STATUS_MESSAGE.READ,
      statusCode: HTTP_STATUS_CODES.OK,
      body: `All Reminders`,
    };
  }

  findOne(id) {
    return {
      status: STATUS_MESSAGE.READ,
      statusCode: HTTP_STATUS_CODES.OK,
      body: `Found Reminder with id ${id}`,
    };
  }

  create(body) {
    return {
      status: STATUS_MESSAGE.CREATED,
      statusCode: HTTP_STATUS_CODES.CREATED,
      body,
    };
  }

  update(id, body) {
    return {
      status: STATUS_MESSAGE.UPDATED,
      statusCode: HTTP_STATUS_CODES.OK,
      body: `updated reminder with ${id} - ${JSON.stringify(body)}`,
    };
  }

  delete(id) {
    return {
      status: STATUS_MESSAGE.DELETED,
      statusCode: HTTP_STATUS_CODES.OK,
      body: `deleted reminder with ${id}`,
    };
  }
}
