import { Button, TextField } from '@material-ui/core';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { addDoc, collection } from 'firebase/firestore';

import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { Reminder } from '../../redux/actions';
import format from 'date-fns/format';
import short from 'short-uuid';
import { useFirebase } from '../../contexts/firebase-context';
import { useState } from 'react';

const styles = (theme: Theme) =>
  createStyles({
    addReminderFormContainer: {
      minHeight: '250px',
      marginTop: '10px',
      display: 'flex',
      flexDirection: 'column',
    },
    closeButton: {
      position: 'absolute',
      right: '10px',
      top: '10px',
    },
  });

interface Props extends WithStyles<typeof styles> {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reminder: Reminder) => void;
}

const AddReminder = (props: Props) => {
  const { classes, isOpen, onClose, onSave } = props;
  const [title, setTitle] = useState('Sample title');
  const [color, setColor] = useState('#d41616');
  const [date, setDate] = useState(format(new Date(), `yyyy-MM-dd'T'HH:mm`));
  const { db } = useFirebase();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const reminder = { id: short.generate(), title, color, datetime: new Date(date) };

    await addDoc(collection(db, `arketa`), reminder);

    onSave(reminder);

    onClose();
  }

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby='form-dialog-title' fullWidth={true} maxWidth='md'>
      <DialogTitle id='form-dialog-title'>
        Add Reminder
        <IconButton aria-label='Close' className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent className={classes.addReminderFormContainer}>
        <form onSubmit={onSubmit}>
          <div style={{ display: 'grid', gridGap: '1rem' }}>
            <div style={{ display: 'grid', gridGap: '1rem', gridTemplateColumns: '5rem 1fr', alignItems: 'center' }}>
              <input placeholder='color' value={color} onChange={(e) => setColor(e.target.value)} type='color' />
              <TextField placeholder='title' value={title} onChange={(e) => setTitle(e.target.value.slice(0, 30))} />
            </div>
            <TextField
              placeholder='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type='datetime-local'
            />
            <Button type='submit'>Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(AddReminder);
