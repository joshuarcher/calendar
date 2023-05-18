import { combineReducers } from "redux";
import {
  OPEN_AGENDA,
  CLOSE_AGENDA,
  OPEN_ADD_REMINDER,
  CLOSE_ADD_REMINDER,
  ADD_REMINDER,
} from "./actions";
import { flow, update, set, concat } from 'lodash/fp';
import { eachDayOfInterval } from "date-fns";
import { format } from "date-fns";

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

// {
//   reminders: {
//     byId: {
//       '23423': Reminder,
//       'asdf2': reminder,
//     },
//     idsByDate: {
//       '2023-05-17': ['asdf2']
//       '2023-05-18': ['asdf2', '23423'],
//       '2023-05-19': ['', '23423'],
//     }
//   }
// }

export const DATE_FORMAT = 'MM/dd/yyyy';


function reminders(state = {}, action: any) {
  switch (action.type) {
    case ADD_REMINDER: {
      const reminder = action.reminder;
      const days = eachDayOfInterval({ start: reminder.start, end: reminder.end });

      return flow(
        set(`byId.${reminder.id}`, reminder),
        ...days.map(day => update(`idsByDate.${format(day, DATE_FORMAT)}`, (ids = []) => concat(ids, reminder.id)))
      )(state);
    }
    default:
      return state;
  }
}

const calendarApp = combineReducers({
  agendaStatus,
  addReminderStatus,
  reminders,
});

export default calendarApp;
