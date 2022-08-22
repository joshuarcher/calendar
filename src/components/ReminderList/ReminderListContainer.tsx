import { connect } from "react-redux";
import ReminderList from "./ReminderList";

interface Props { }

interface State {
}
const mapStateToProps = (state: State, ownProps: Props) => {
    return {
      };
};

const mapDispatchToProps = (dispatch: any) => {
    return {

    };
};

const ReminderListContainer = connect(mapStateToProps, mapDispatchToProps)(ReminderList);

export default ReminderListContainer;
