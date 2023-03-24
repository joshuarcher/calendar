import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { format } from 'date-fns';
import { Model } from 'mongoose';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Reminder } from './entities/reminder.entity';

@Injectable()
export class RemindersService {
  constructor(
    @InjectModel(Reminder.name) private readonly reminderModel: Model<Reminder>,
  ) {}

  async findAll() {
    // return this.reminderModel.find().exec();
    const allReminders: Reminder[] = await this.reminderModel.find().exec();
    // return allReminders;

    // Not sure if we would rather format it as an object on the server side or client side.
    // My preference is to generally run things server side since we have
    // better cache control and performance

    const reminders = {};
    allReminders.map((newReminder) => {
      const key = format(new Date(newReminder.date), 'yyyyMMdd');
      console.log(key);
      // check if key exists
      if (reminders[key]) {
        return (reminders[key] = [...reminders[key], newReminder]);
      }
      return (reminders[key] = [newReminder]);
    });

    return reminders;
  }

  async findOne(id: string) {
    const reminder = await this.reminderModel.find({ _id: id }).exec();
    if (!reminder) throw new NotFoundException('Reminder not found.');
    return reminder;
  }

  create(createReminderDto: CreateReminderDto) {
    const reminder = new this.reminderModel({ ...createReminderDto });
    return reminder.save();
  }

  async update(id: string, updateReminderDto: UpdateReminderDto) {
    const existingReminder = await this.reminderModel
      .findOneAndUpdate({ _id: id }, { $set: updateReminderDto }, { new: true })
      .exec();

    if (!existingReminder) {
      throw new NotFoundException(`Reminder #${id} not found`);
    }
    return existingReminder;
  }

  async delete(id: string) {
    return this.reminderModel.deleteOne({ _id: id });
  }
}
