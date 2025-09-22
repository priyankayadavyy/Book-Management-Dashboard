import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";

const genres = ["Fiction", "Self-help", "History", "Finance", "Programming"];
const statuses = ["Available", "Issued"];

export default function BookForm({
  open,
  onClose,
  onSubmit,
  initialValues = {},
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      year: "",
      status: "Available",
      ...initialValues,
    },
  });

  useEffect(() => {
    reset({ ...initialValues });
  }, [initialValues, reset]);

  const submit = (data) => {
    data.year = Number(data.year);
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialValues.id ? "Edit Book" : "Add New Book"}
      </DialogTitle>
      <form onSubmit={handleSubmit(submit)}>
        <DialogContent dividers>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            {...register("title", { required: "Title is required" })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            label="Author"
            fullWidth
            margin="normal"
            {...register("author", { required: "Author is required" })}
            error={!!errors.author}
            helperText={errors.author?.message}
          />

          <TextField
            select
            label="Genre"
            fullWidth
            margin="normal"
            {...register("genre", { required: "Genre is required" })}
            error={!!errors.genre}
            helperText={errors.genre?.message}
          >
            {genres.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Published Year"
            type="number"
            fullWidth
            margin="normal"
            {...register("year", { required: "Year is required" })}
            error={!!errors.year}
            helperText={errors.year?.message}
          />

          <TextField
            select
            label="Status"
            fullWidth
            margin="normal"
            defaultValue="Available"
            {...register("status", { required: true })}
          >
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
