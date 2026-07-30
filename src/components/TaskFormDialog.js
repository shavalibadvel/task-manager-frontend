import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const emptyForm = { title: "", description: "", deadline: null };

function TaskFormDialog({ open, task, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const isEdit = Boolean(task);

  // Reload the fields each time the modal opens so a cancelled edit doesn't
  // leak into the next task.
  useEffect(() => {
    if (!open) return;

    setForm(
      isEdit
        ? {
            title: task.title,
            description: task.description,
            deadline: dayjs(task.deadline),
          }
        : emptyForm
    );
    setFile(null);
    setErrors({});
  }, [open, isEdit, task]);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setErrors({ ...errors, [key]: "" });
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Title is required";
    if (!form.description.trim()) next.description = "Description is required";
    if (!form.deadline) next.deadline = "Deadline is required";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // FormData carries the text fields and the PDF in a single request.
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("deadline", form.deadline.toISOString());
    if (file) formData.append("linkedFile", file);

    onSave(formData, isEdit ? task._id : null);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            required
            fullWidth
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            error={Boolean(errors.title)}
            helperText={errors.title}
          />

          <TextField
            label="Description"
            required
            fullWidth
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            error={Boolean(errors.description)}
            helperText={errors.description}
          />

          <DatePicker
            label="Deadline"
            format="DD-MM-YYYY"
            value={form.deadline}
            onChange={(value) => handleChange("deadline", value)}
            slotProps={{
              textField: {
                required: true,
                fullWidth: true,
                error: Boolean(errors.deadline),
                helperText: errors.deadline,
              },
            }}
          />

          <div>
            <Button
              variant="contained"
              startIcon={<UploadFileIcon />}
              onClick={() => fileInputRef.current.click()}
            >
              Upload PDF
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file && (
              <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                {file.name}
              </Typography>
            )}
          </div>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, justifyContent: "space-between" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {isEdit ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskFormDialog;