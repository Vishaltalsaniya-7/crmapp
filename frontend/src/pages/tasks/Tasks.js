import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  Chip,
  Tooltip,
  Button,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CompleteIcon,
} from '@mui/icons-material';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import TaskForm from './TaskForm';
import api from '../../services/api';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const columns = [
    { 
      id: 'title', 
      label: 'Title',
      render: (value, task) => (
        <Box>
          <Typography variant="subtitle2">{value}</Typography>
          <Typography variant="body2" color="text.secondary">
            {task.description}
          </Typography>
        </Box>
      )
    },
    {
      id: 'priority',
      label: 'Priority',
      render: (value) => (
        <Chip
          label={value}
          color={
            value === 'High' ? 'error' :
            value === 'Medium' ? 'warning' : 'default'
          }
          size="small"
        />
      )
    },
    {
      id: 'status',
      label: 'Status',
      render: (value) => (
        <Chip
          label={value}
          color={
            value === 'Completed' ? 'success' :
            value === 'In Progress' ? 'info' : 'default'
          }
          size="small"
        />
      )
    },
    { id: 'dueDate', label: 'Due Date' },
    { id: 'assignedTo', label: 'Assigned To' },
    {
      id: 'actions',
      label: 'Actions',
      render: (_, task) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Complete">
            <IconButton
              size="small"
              color="success"
              onClick={() => handleCompleteTask(task.id)}
              disabled={task.status === 'Completed'}
            >
              <CompleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => handleEdit(task)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(task.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.getTasks();
      const data = await response.json();
      if (response.ok) {
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedTask(null);
    setOpenForm(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await api.deleteTask(id);
        if (response.ok) {
          fetchTasks();
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      const response = await api.completeTask(id);
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleSubmit = async (taskData) => {
    try {
      if (selectedTask) {
        await api.updateTask(selectedTask.id, taskData);
      } else {
        await api.createTask(taskData);
      }
      setOpenForm(false);
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title="Tasks"
        action={true}
        actionText="Add Task"
        actionIcon={<AddIcon />}
        onActionClick={handleAdd}
      />

      <DataTable
        columns={columns}
        data={tasks}
        loading={loading}
      />

      <TaskForm
        open={openForm}
        task={selectedTask}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Tasks;