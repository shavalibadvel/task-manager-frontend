import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { fileUrl } from "../services/taskService";
import { formatDate, getDisplayStatus } from "../utils/taskStatus";

function TaskTable({ tasks, onDone, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>

              <TableCell>
                {formatDate(task.deadline)}
                <Typography sx={{ fontFamily: "monospace", fontSize: 13 }}>
                  {getDisplayStatus(task)}
                </Typography>
              </TableCell>

              <TableCell>
                <Chip
                  label={task.status}
                  size="small"
                  color={task.status === "DONE" ? "success" : "warning"}
                />
              </TableCell>

              <TableCell>
                {task.status === "TODO" && (
                  <IconButton color="success" onClick={() => onDone(task._id)} title="Mark as done">
                    <CheckCircleIcon />
                  </IconButton>
                )}

                {task.hasFile && (
                  <IconButton
                    color="primary"
                    component="a"
                    href={fileUrl(task._id)}
                    title="Download PDF"
                  >
                    <DownloadIcon />
                  </IconButton>
                )}

                <IconButton color="secondary" onClick={() => onEdit(task)} title="Edit">
                  <EditIcon />
                </IconButton>

                <IconButton color="error" onClick={() => onDelete(task._id)} title="Delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaskTable;