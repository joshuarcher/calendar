import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateReminderDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly date: string;

  @IsBoolean()
  readonly allDay: boolean;

  @IsString()
  @IsOptional()
  readonly startTime: string;

  @IsString()
  @IsOptional()
  readonly endTime: string;

  @IsString()
  readonly color: string;
}
