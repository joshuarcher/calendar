import { connect } from "react-redux";
import AddReminder from "./AddReminder";
import { closeAddReminder } from "../../redux/actions";
import { ReminderInterface } from "../../utils/reminderInterface";

interface State {
  addReminderStatus: {
    reminder: ReminderInterface;
    isOpen: boolean;
  };
}

const mapStateToProps = (state: State) => {
  return {
    reminder: state.addReminderStatus.reminder,
    isOpen: state.addReminderStatus.isOpen,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClose: () => {
      dispatch(closeAddReminder());
    },
  };
};

const AddReminderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddReminder);

export default AddReminderContainer;
