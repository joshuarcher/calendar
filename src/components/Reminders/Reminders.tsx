import React from 'react';
import { Reminder } from '../../redux/actions';
import isSameDay from 'date-fns/isSameDay';

interface Props {
  date: Date;
  reminders: Reminder[];
}

export function Reminders({ date, reminders }: Props) {
  const todaysReminders = reminders
    .filter((reminder) => isSameDay(reminder.datetime, date))
    .sort((a, b) => (a.datetime.getTime() > b.datetime.getTime() ? 1 : -1)).slice(0, 10);

  return (
    <div>
      {todaysReminders.map((reminder) => (
        <div key={reminder.id} style={{ backgroundColor: reminder.color }}>
          {reminder.title}
        </div>
      ))}
    </div>
  );
}
