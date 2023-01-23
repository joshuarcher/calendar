import { Reminder, closeAddReminder, saveReminder } from '../../redux/actions';

import AddReminder from './AddReminder';
import { connect } from 'react-redux';

interface State {
  addReminderStatus: {
    isOpen: boolean;
  };
}

const mapStateToProps = (state: State) => {
  return {
    isOpen: state.addReminderStatus.isOpen,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSave: (reminder: Reminder) => {
      dispatch(saveReminder(reminder));
    },
    onClose: () => {
      dispatch(closeAddReminder());
    },
  };
};

const AddReminderContainer = connect(mapStateToProps, mapDispatchToProps)(AddReminder);

export default AddReminderContainer;
