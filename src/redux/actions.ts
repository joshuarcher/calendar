// action types
export const OPEN_AGENDA = "OPEN_AGENDA";
export const CLOSE_AGENDA = "CLOSE_AGENDA";
export const OPEN_ADD_REMINDER = "OPEN_ADD_REMINDER";
export const CLOSE_ADD_REMINDER = "CLOSE_ADD_REMINDER";
export const ADD_EVENT = "ADD_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";

interface DateObj {
  date: Date;
}

export interface EventItem {
  title: String;
  date: Date;
}

// action creators
export function openAgenda(dateObj: DateObj) {
  return { type: OPEN_AGENDA, dateObj };
}

export function closeAgenda() {
  return { type: CLOSE_AGENDA };
}

export function openAddReminder(reminder?: any) {
  return { type: OPEN_ADD_REMINDER, reminder };
}

export function closeAddReminder() {
  return { type: CLOSE_ADD_REMINDER };
}

// this will create an event action
// the event should match the eventItem iterface
// we should also be able to add addional details to
export function addEvent(event: EventItem) {
  return { type: ADD_EVENT, event };
}

export function deleteEvent(event: EventItem) {
  return { type: DELETE_EVENT, event };
}
