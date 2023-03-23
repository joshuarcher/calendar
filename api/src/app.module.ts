import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RemindersController } from './reminders/reminders.controller';
import { RemindersService } from './reminders/reminders.service';

@Module({
  imports: [],
  controllers: [AppController, RemindersController],
  providers: [AppService, RemindersService],
})
export class AppModule {}
