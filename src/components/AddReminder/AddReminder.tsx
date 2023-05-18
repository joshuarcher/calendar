import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import Grid from "@mui/material/Grid";
import Popover from "@mui/material/Popover";
import { DigitalClock } from "@mui/x-date-pickers/DigitalClock";
import MenuItem from "@mui/material/MenuItem";
import { HexColorPicker } from "react-colorful";
import { Avatar } from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import ColorizeIcon from "@mui/icons-material/Colorize";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import Box from "@mui/material/Box";
import { useForm, Controller, useWatch } from "react-hook-form";
import { blue } from "@mui/material/colors";
import format from "date-fns/format";
import {
  add,
  addMinutes,
  differenceInHours,
  differenceInMinutes,
  formatDistance,
  formatISO,
  isBefore,
  isSameDay,
  roundToNearestMinutes,
} from "date-fns";
import { useMemo } from "react";
import { ReminderDTO } from "../../redux/actions";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  addReminder: (reminder: ReminderDTO) => void;
}

const ColorPicker = ({ control, onChange }) => {
  const [el, setEl] = React.useState<HTMLButtonElement | null>(null);
  const value = useWatch({ control, name: "color" });

  return (
    <>
      <button
        css={{ all: "unset" }}
        onClick={(event) => setEl(event.currentTarget)}
      >
        <Avatar
          sx={{ bgcolor: value, height: 56, width: 56 }}
          variant="rounded"
        >
          <ColorizeIcon />
        </Avatar>
      </button>

      <Popover
        id="end date picker"
        sx={{ overflow: "hidden", borderRadius: "8px" }}
        open={Boolean(el)}
        anchorEl={el}
        onClose={() => setEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{ sx: { overflow: "hidden", borderRadius: "8px" } }}
        disableAutoFocus={true}
        disableEnforceFocus={true}
      >
        <HexColorPicker color={value} onChange={onChange} />
      </Popover>
    </>
  );
};

const StartDate = ({ control }) => {
  const [isDateOpen, setDateOpen] = React.useState<boolean>(false);

  return (
    <>
      <Grid item>
        <Controller
          name="start"
          control={control}
          render={({ field, fieldState }) => (
            <DatePicker
              label="Date"
              format="EEEE, d MMM"
              open={isDateOpen}
              slotProps={{
                textField: {
                  onClick: () => setDateOpen(true),
                },
              }}
              onOpen={() => setDateOpen(true)}
              onClose={() => setDateOpen(false)}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="start"
          control={control}
          render={({ field, fieldState }) => (
            <TimeField
              label="Start"
              format="HH:mm"
              css={{ maxWidth: "80px" }}
              {...field}
            />
          )}
        />
      </Grid>
    </>
  );
};

const formatEventDuration = (start, end) => {
  const minutes = differenceInMinutes(end, start);

  return minutes > 60
    ? `${Math.round((minutes / 60) * 10) / 10} h`
    : `${minutes} mins`;
};

const EndDate = ({ control }) => {
  const [isDateOpen, setDateOpen] = React.useState<boolean>(false);
  const startDate = useWatch({ control, name: "start" });
  const endDate = useWatch({ control, name: "end" });
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.FocusEvent<HTMLInputElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sameDay = !endDate || isSameDay(endDate, startDate);

  const options = useMemo(() => {
    if (sameDay) {
      let cursorOption = addMinutes(
        roundToNearestMinutes(startDate, {
          nearestTo: 15,
          roundingMethod: "ceil",
        }),
        15
      );
      const options = [cursorOption];

      while (differenceInHours(cursorOption, startDate) < 24) {
        const minutesToAdd = options.length > 3 ? 30 : 15;
        cursorOption = add(cursorOption, { minutes: minutesToAdd });
        options.push(cursorOption);
      }

      return options;
    } else {
      const firstOption = new Date(endDate);
      firstOption.setHours(0, 0, 0, 0);

      const options = [firstOption];

      for (let i = 1; i <= 47; i++) {
        options.push(addMinutes(firstOption, i * 30));
      }

      return options;
    }
  }, [startDate, sameDay, endDate]);

  return (
    <Controller
      name="end"
      control={control}
      rules={{
        required: { value: true, message: "Please provide an end date" },
      }}
      render={({ field, fieldState }) => (
        <>
          <Grid item>
            <TimeField
              label="End"
              format="HH:mm"
              minTime={startDate}
              css={{ maxWidth: "80px" }}
              onFocus={handleClick}
              color={fieldState.invalid ? 'error' : 'primary'}
              {...field}
            />
            <Popover
              id="end date picker"
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              disableAutoFocus={true}
              disableEnforceFocus={true}
            >
              <div css={{ maxHeight: "250px" }}>
                {options.map((date, i) => {
                  const option = format(date, "HH:mm");
                  return (
                    <MenuItem
                      onClick={() => field.onChange(date)}
                      key={i}
                    >{`${option}${
                      sameDay ? ` (${formatEventDuration(startDate, date)})` : ""
                    }`}</MenuItem>
                  );
                })}
              </div>
            </Popover>
          </Grid>
          {!field.value || isSameDay(field.value, startDate) ? null : (
            <Grid item>
              <DatePicker
                minDate={startDate}
                label="End Date"
                format="EEEE, d MMM"
                open={isDateOpen}
                slotProps={{
                  textField: {
                    onClick: () => setDateOpen(true),
                  },
                }}
                onOpen={() => setDateOpen(true)}
                onClose={() => setDateOpen(false)}
                {...field}
              />
            </Grid>
          )}
        </>
      )}
    />
  );
};

const AddReminder = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      color: blue[400],
      start: roundToNearestMinutes(new Date(), {
        nearestTo: 15,
        roundingMethod: "floor",
      }),
      end: undefined,
    },
  });
  const { isOpen, onClose, addReminder } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        Add Reminder
        <IconButton
          aria-label="Close"
          sx={{ position: "absolute", right: "10px", top: "10px" }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent
        sx={{
          minHeight: "250px",
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <form onSubmit={handleSubmit(addReminder)}>
          <Box sx={{ marginBottom: 4, mx: 2 }}>
            <Grid container spacing={2} sx={{ flexWrap: "nowrap" }}>
              <Grid item sx={{ width: "100%" }}>
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Reminders must have a title",
                    },
                    maxLength: {
                      value: 30,
                      message: "Title must be no longer than 30 characters",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      autoFocus
                      id="title"
                      label="Add a title"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={Boolean(fieldState.invalid)}
                      helperText={fieldState.error?.message}
                      margin="normal"
                      fullWidth
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item sx={{ marginTop: "16px" }}>
                <ColorPicker
                  control={control}
                  onChange={(value) => setValue("color", value)}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: 1 }}>
              <StartDate control={control} />
              <Grid
                item
                sx={{ fontSize: 24, alignItems: "center", display: "flex" }}
              >
                -
              </Grid>
              <EndDate control={control} />
            </Grid>
          </Box>

          <Divider variant="middle" />
          <Stack
            spacing={2}
            direction="row"
            sx={{ justifyContent: "end", mx: 2, marginTop: 4, marginBottom: 2 }}
          >
            <Button variant="outlined" color="error" size="large" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Save
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReminder;
