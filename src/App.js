import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  CircularProgress,
  Container,
  Fab,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import TaskTable from "./components/TaskTable";
import TaskFormDialog from "./components/TaskFormDialog";
import * as taskService from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState({ open: false, task: null });

  // Every mutation just refetches — simple and always correct.
  const loadTasks = async () => {
    setLoading(true);
    try {
      setTasks(await taskService.getTasks());
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSave = async (formData, taskId) => {
    if (taskId) await taskService.updateTask(taskId, formData);
    else await taskService.createTask(formData);

    setDialog({ open: false, task: null });
    loadTasks();
  };

  const handleDone = async (id) => {
    await taskService.markAsDone(id);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await taskService.deleteTask(id);
    loadTasks();
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Task Manager</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4, pb: 12 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress />
          </Box>
        ) : tasks.length === 0 ? (
          <Typography variant="h5" align="center" sx={{ py: 10 }}>
            No tasks found!
          </Typography>
        ) : (
          <TaskTable
            tasks={tasks}
            onDone={handleDone}
            onEdit={(task) => setDialog({ open: true, task })}
            onDelete={handleDelete}
          />
        )}
      </Container>

      <Fab
        color="primary"
        aria-label="Add task"
        onClick={() => setDialog({ open: true, task: null })}
        sx={{ position: "fixed", bottom: 32, right: 32 }}
      >
        <AddIcon />
      </Fab>

      <TaskFormDialog
        open={dialog.open}
        task={dialog.task}
        onClose={() => setDialog({ open: false, task: null })}
        onSave={handleSave}
      />
    </Box>
  );
}

export default App;