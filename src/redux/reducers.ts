import { CLOSE_ADD_REMINDER, CLOSE_AGENDA, OPEN_ADD_REMINDER, OPEN_AGENDA, Reminder, SAVE_REMINDER } from './actions';

import { combineReducers } from 'redux';
import { setReminders } from '../utils/localforage';
import short from 'short-uuid';

const DEFAULT_REMINDERS: Reminder[] = [
  {
    id: short.generate(),
    title: 'Test 26 13:14',
    color: 'red',
    datetime: new Date('2023-01-26T13:14:00.000Z'),
  },
  {
    id: short.generate(),
    title: 'Test 13:14',
    color: 'red',
    datetime: new Date('2023-01-25T13:14:00.000Z'),
  },
  {
    id: short.generate(),
    title: 'Test 13:15',
    color: 'orange',
    datetime: new Date('2023-01-25T13:15:00.000Z'),
  },
  {
    id: short.generate(),
    title: 'Test 13:16',
    color: 'yellow',
    datetime: new Date('2023-01-25T13:16:00.000Z'),
  },
  {
    id: short.generate(),
    title: 'Test 13:17',
    color: 'green',
    datetime: new Date('2023-01-25T13:17:00.000Z'),
  },
  {
    id: short.generate(),
    title: 'Test 13:18',
    color: 'blue',
    datetime: new Date('2023-01-25T13:18:00.000Z'),
  },
  {
    id: short.generate(),
    title: 'Test 13:19',
    color: 'indigo',
    datetime: new Date('2023-01-25T13:19:00.000Z'),
  },
  {
    id: short.generate(),
    title: 'Test 13:20',
    color: 'violet',
    datetime: new Date('2023-01-25T13:20:00.000Z'),
  },
  {
    id: short.generate(),
    title: 'Test 13:21',
    color: 'red',
    datetime: new Date('2023-01-25T13:21:00.000Z'),
  },
  {
    id: short.generate(),
    title: 'Test 13:22',
    color: 'orange',
    datetime: new Date('2023-01-25T13:22:00.000Z'),
  },
];

const initialAgendaState = {
  isOpen: false,
  date: null,
};

const initialAddReminderState = {
  isOpen: false,
};

function agendaStatus(state = initialAgendaState, action: any) {
  switch (action.type) {
    case OPEN_AGENDA:
      return {
        isOpen: true,
        date: action.dateObj.date,
      };
    case CLOSE_AGENDA:
      return {
        isOpen: false,
        date: null,
      };
    default:
      return state;
  }
}

function addReminderStatus(state = initialAddReminderState, action: any) {
  switch (action.type) {
    case OPEN_ADD_REMINDER:
      return {
        isOpen: true,
      };
    case CLOSE_ADD_REMINDER:
      return {
        isOpen: false,
      };
    default:
      return state;
  }
}

function addReminder(state = DEFAULT_REMINDERS, action: any) {
  switch (action.type) {
    case SAVE_REMINDER: {
      const updatedReminders = [...state];
      const existingReminderIndex = updatedReminders.findIndex((reminder) => reminder.id === action.reminder.id);
      if (existingReminderIndex > -1) {
        updatedReminders[existingReminderIndex] = action.reminder;
      } else {
        updatedReminders.push(action.reminder);
      }

      setReminders(updatedReminders);

      return updatedReminders;
    }
    default:
      return state;
  }
}

const calendarApp = combineReducers({
  addReminder,
  agendaStatus,
  addReminderStatus,
});

export default calendarApp;
