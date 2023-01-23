import { openAddReminder, saveReminder } from '../../redux/actions';

import App from './App';
import { connect } from 'react-redux';
import { getReminders } from '../../utils/localforage';

interface Props {}
interface State {}

const mapStateToProps = (state: State, ownProps: Props) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    syncReminders: async () => {
      const reminders = await getReminders();

      reminders.map((reminder) => dispatch(saveReminder(reminder)));
    },
    onFabAddClick: () => {
      dispatch(openAddReminder());
    },
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
