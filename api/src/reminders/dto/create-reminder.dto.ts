import { IsString } from 'class-validator';

export class CreateReminderDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly date: string;
}
