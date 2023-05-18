import { connect } from "react-redux";
import CalendarDay from "./CalendarDay";
import { openAgenda } from "../../redux/actions";
import { get } from 'lodash/fp';
import { format } from "date-fns";
import { DATE_FORMAT } from "../../redux/reducers";
import { isSameDay } from "date-fns/esm";

interface Props {
  dateObj: { date: Date };
}

type State = any;

interface DateObj {
  date: Date;
}

const mapStateToProps = (state: State, ownProps: Props) => {
  console.log(format(ownProps.dateObj.date, DATE_FORMAT));
  const reminderIdss = state.reminders?.idsByDate;
  console.log(reminderIdss);
  const reminderIds = get(`reminders.idsByDate.${format(ownProps.dateObj.date, DATE_FORMAT)}}`)(state);
  console.log(reminderIds);
  const reminders = (reminderIds || []).map(id => get(`reminders.byId.${id}`, state));
  return { ...state, ...ownProps, reminders };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onDayClick: (dateObj: DateObj) => {
      dispatch(openAgenda(dateObj));
    },
  };
};

const CalendarDayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarDay);

export default CalendarDayContainer;
