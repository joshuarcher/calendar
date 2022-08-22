import { combineReducers } from "redux";
import {
  OPEN_AGENDA,
  CLOSE_AGENDA,
  OPEN_ADD_REMINDER,
  CLOSE_ADD_REMINDER,
  ADD_REMINDER
} from "./actions";
const initialAgendaState = {
  isOpen: false,
  date: null,
};

const initialAddReminderState = {
  isOpen: false,
};

let initialRemindersState = [];

function updateReminders(state = initialRemindersState, action: any) {
  switch (action.type) {
    case ADD_REMINDER:
      state.push(action.reminder);
      return state;
    default:
      return state;
  }
}

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

const calendarApp = combineReducers({
  agendaStatus,
  addReminderStatus,
  updateReminders
});

export default calendarApp;
