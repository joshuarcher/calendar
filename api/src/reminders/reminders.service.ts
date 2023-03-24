import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Reminder } from './entities/reminder.entity';

@Injectable()
export class RemindersService {
  constructor(
    @InjectModel(Reminder.name) private readonly reminderModel: Model<Reminder>,
  ) {}

  findAll() {
    return this.reminderModel.find().exec();
  }

  async findOne(id: string) {
    const reminder = await this.reminderModel.find({ _id: id }).exec();
    if (!reminder) throw new NotFoundException('Reminder not found.');
    return reminder;
  }

  create(createReminderDto: CreateReminderDto) {
    const reminder = new this.reminderModel(createReminderDto);
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
    const reminder = await this.findOne(id);
    return this.reminderModel.deleteOne(reminder);
  }
}
