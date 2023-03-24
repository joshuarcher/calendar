import { Grid, FormControl, FormLabel, Input, Button } from "@material-ui/core";
import React, { useState } from "react";
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

  const addReminder = async () => {
    await fetch("http://localhost:8000/reminders", {
      method: "POST",
      body: JSON.stringify({
        title: "Test",
        date: new Date().toDateString(),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    // handle form submission to db
    addReminder();
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
