import { connect } from "react-redux";
import ReminderList from "./ReminderList";
import { ReminderInterface } from "../../utils/reminderInterface";
import { openAddReminder } from "../../redux/actions";

interface Props { }

interface State {
    updateReminders: ReminderInterface[];
    agendaStatus: {
        date: Date;
    };
}
const mapStateToProps = (state: State, ownProps: Props) => {
    return {
        reminders: state.updateReminders,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        handleEdit: (reminder: ReminderInterface) => {
            dispatch(openAddReminder(reminder));
        },
    };
};

const ReminderListContainer = connect(mapStateToProps, mapDispatchToProps)(ReminderList);

export default ReminderListContainer;
