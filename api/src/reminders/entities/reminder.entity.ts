import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Reminder extends Document {
  @Prop()
  title: string;

  @Prop()
  date: string;
}

export const ReminderSchema = SchemaFactory.createForClass(Reminder);
