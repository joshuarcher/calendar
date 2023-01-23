import { Reminder, closeAgenda } from '../../redux/actions';

import AgendaDay from './AgendaDay';
import { connect } from 'react-redux';

interface Props {}

interface State {
  addReminder: Reminder[];
  agendaStatus: {
    isOpen: boolean;
    date: Date;
  };
}

const mapStateToProps = (state: State, ownProps: Props) => {
  const { addReminder, agendaStatus } = state;

  return { addReminder, agendaStatus };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClose: () => {
      dispatch(closeAgenda());
    },
  };
};

const AgendaDayContainer = connect(mapStateToProps, mapDispatchToProps)(AgendaDay);

export default AgendaDayContainer;
