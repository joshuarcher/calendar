import { IsString } from 'class-validator';

export class CreateReminderDto {
  @IsString()
  readonly title: string;
}
