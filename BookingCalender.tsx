import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BookingCalendar = ({ unavailableDates, onDateSelect, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    if (!unavailableDates.includes(formattedDate)) {
      setSelectedDate(date); // Set the selected date, but do not call onDateSelect yet
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      if (unavailableDates.includes(formattedDate)) {
        return 'highlight-unavailable'; // Custom CSS class for unavailable dates
      }
    }
    return null;
  };

  const handleConfirmAppointment = () => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // Format the selected date
      onDateSelect(formattedDate); // Now call onDateSelect only when the user confirms
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Select a Date for Your Tour</h3>
      <Calendar
        onClickDay={handleDateClick}
        value={selectedDate || new Date()}
        tileClassName={tileClassName}
      />
      <div style={styles.buttonContainer}>
        <button style={styles.closeButton} onClick={onClose}>
          Close
        </button>
        <button style={styles.confirmButton} onClick={handleConfirmAppointment}>
          Confirm Appointment
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
  },
  header: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '16px',
  },
  buttonContainer: {
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  closeButton: {
    padding: '8px 16px',
    backgroundColor: '#0D1B2A', // Gray color
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  confirmButton: {
    padding: '8px 16px',
    backgroundColor: '#0D1B2A', // Indigo color
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default BookingCalendar;
