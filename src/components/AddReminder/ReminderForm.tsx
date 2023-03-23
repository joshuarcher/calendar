import { Grid, FormControl, FormLabel, Input, Button } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import ColorSelect from "./ColorSelector";

export default function ReminderForm() {
  const [formData, updateFormData] = useState({
    title: "",
    date: "",
    time: "",
    color: "red",
    notes: "",
  });

  function handleChange(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    updateFormData({ ...formData, [name]: value });

    console.log(formData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // do client side validation

    // handle form submission to db

    // if db 200 close form

    // if error report error to user
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={8}>
        <Grid item xs={6}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        {/* Conditionally display time if AllDay is unchecked */}
        <Grid item xs={6}>
          <FormControl>
            <FormLabel>Time</FormLabel>
            <Input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <FormLabel>Notes</FormLabel>
            <Input
              type="textarea"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <ColorSelect value={formData.color} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <Button type="submit">Create Reminder</Button>
        </Grid>
      </Grid>
    </form>
  );
}
