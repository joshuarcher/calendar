import { connect } from "react-redux";
import ReminderList from "./ReminderList";
import { ReminderInterface } from "../../utils/reminderInterface";

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

    };
};

const ReminderListContainer = connect(mapStateToProps, mapDispatchToProps)(ReminderList);

export default ReminderListContainer;
