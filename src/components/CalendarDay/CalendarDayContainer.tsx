import { connect } from "react-redux";
import CalendarDay from "./CalendarDay";
import { EventItem, openAgenda, openAddReminder } from "../../redux/actions";

interface Props {}

interface State {
  events: EventItem[];
}

interface DateObj {
  date: Date;
}

const mapStateToProps = (state: State, ownProps: Props) => {
  return { ...state, ...ownProps };
};
// this is the container that supports props for the calendar day component. 
// TODO: we need to check if there is an event on the matching calendar day and toggle which modal should open.
const mapDispatchToProps = (dispatch: any) => {
  return {
    onDayClick: (dateObj: DateObj) => {
      // could check here if items are on this day else open the create event modal.
      if (false) {
        dispatch(openAgenda(dateObj));
      } else {
        dispatch(openAddReminder(dateObj));
      }
    },
  };
};

const CalendarDayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarDay);

export default CalendarDayContainer;
