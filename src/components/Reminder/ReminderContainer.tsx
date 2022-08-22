import { connect } from "react-redux";
import Reminder from "./Reminder";
import { ReminderInterface } from "../../utils/reminderInterface";
import { addReminder } from "../../redux/actions";

interface Props { }

interface State {
    updateReminders: {
        reminders: ReminderInterface[]
    }
}
const mapStateToProps = (state: State, ownProps: Props) => {
    return {
        reminders: state.updateReminders.reminders,
      };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (reminder: ReminderInterface) => {
            dispatch(addReminder(reminder));
        },
    };
};

const ReminderContainer = connect(mapStateToProps, mapDispatchToProps)(Reminder);

export default ReminderContainer;
