import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import PageHeader from '../../components/common/PageHeader';
import EventForm from './EventForm';
import api from '../../services/api';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.getEvents();
      const data = await response.json();
      if (response.ok) {
        const formattedEvents = data.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formattedEvents);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (slotInfo) => {
    setSelectedEvent(null);
    setSelectedDate(slotInfo.start);
    setOpenForm(true);
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setOpenForm(true);
  };

  const handleSubmit = async (eventData) => {
    try {
      if (selectedEvent) {
        await api.updateEvent(selectedEvent.id, eventData);
      } else {
        await api.createEvent(eventData);
      }
      setOpenForm(false);
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const eventStyleGetter = (event) => {
    let style = {
      backgroundColor: '#3174ad',
      borderRadius: '4px',
      opacity: 0.8,
      color: 'white',
      border: '0',
      display: 'block',
    };

    if (event.type === 'meeting') {
      style.backgroundColor = '#1976d2';
    } else if (event.type === 'task') {
      style.backgroundColor = '#2e7d32';
    } else if (event.type === 'reminder') {
      style.backgroundColor = '#ed6c02';
    }

    return {
      style,
    };
  };

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title="Calendar"
        action={true}
        actionText="Add Event"
        actionIcon={<AddIcon />}
        onActionClick={() => handleAdd({ start: new Date() })}
      />

      <Paper sx={{ p: 2, height: 'calc(100vh - 200px)' }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectEvent={handleEdit}
          onSelectSlot={handleAdd}
          selectable
          eventPropGetter={eventStyleGetter}
          views={['month', 'week', 'day', 'agenda']}
          components={{
            toolbar: CustomToolbar,
          }}
        />
      </Paper>

      <EventForm
        open={openForm}
        event={selectedEvent}
        initialDate={selectedDate}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

const CustomToolbar = ({ onNavigate, label }) => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    mb: 2 
  }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton onClick={() => onNavigate('PREV')}>
        <ChevronLeft />
      </IconButton>
      <Typography variant="h6">{label}</Typography>
      <IconButton onClick={() => onNavigate('NEXT')}>
        <ChevronRight />
      </IconButton>
    </Box>
  </Box>
);

export default Calendar;