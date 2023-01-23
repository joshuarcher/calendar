import { Reminders, openAgenda } from '../../redux/actions';

import CalendarDay from './CalendarDay';
import { connect } from 'react-redux';

interface Props {}

interface State {
  addReminder: Reminders;
}

interface DateObj {
  date: Date;
}

const mapStateToProps = (state: State, ownProps: Props) => {
  return { reminders: state.addReminder, ...ownProps };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onDayClick: (dateObj: DateObj) => {
      dispatch(openAgenda(dateObj));
    },
  };
};

const CalendarDayContainer = connect(mapStateToProps, mapDispatchToProps)(CalendarDay);

export default CalendarDayContainer;
