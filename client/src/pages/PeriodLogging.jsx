import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const PeriodLogging = () => {
  const [date, setDate] = useState(new Date());
  const [flowLevel, setFlowLevel] = useState('medium');
  const [symptoms, setSymptoms] = useState([]);
  const [notes, setNotes] = useState('');
  const [loggedDays, setLoggedDays] = useState({});
  const [showForm, setShowForm] = useState(false);

  const symptomOptions = [
    'Cramps',
    'Headache',
    'Bloating',
    'Fatigue',
    'Mood swings',
    'Back pain',
    'Breast tenderness',
    'Acne',
    'Nausea'
  ];

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setShowForm(true);
    // Load existing data if available for this date
    const dateStr = newDate.toISOString().split('T')[0];
    if (loggedDays[dateStr]) {
      setFlowLevel(loggedDays[dateStr].flowLevel || 'medium');
      setSymptoms(loggedDays[dateStr].symptoms || []);
      setNotes(loggedDays[dateStr].notes || '');
    } else {
      // Reset form for new date
      setFlowLevel('medium');
      setSymptoms([]);
      setNotes('');
    }
  };

  const handleSymptomToggle = (symptom) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter(s => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateStr = date.toISOString().split('T')[0];
    setLoggedDays({
      ...loggedDays,
      [dateStr]: {
        flowLevel,
        symptoms,
        notes
      }
    });
    setShowForm(false);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      const dayData = loggedDays[dateStr];
      
      if (dayData) {
        // Return different content based on flow level
        let flowIndicator;
        switch(dayData.flowLevel) {
          case 'light':
            flowIndicator = '🔴';
            break;
          case 'medium':
            flowIndicator = '🔴🔴';
            break;
          case 'heavy':
            flowIndicator = '🔴🔴🔴';
            break;
          case 'spotting':
            flowIndicator = '⚪';
            break;
          default:
            flowIndicator = '';
        }
        
        return (
          <div className="day-indicator">
            {flowIndicator}
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      if (loggedDays[dateStr]) {
        return 'logged-day';
      }
    }
    return '';
  };

  return (
    <div className="period-logging-container">
      <h2>Period Tracker</h2>
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileContent={tileContent}
          tileClassName={tileClassName}
        />
      </div>

      {showForm && (
        <div className="logging-form">
          <h3>Log Period Data for {date.toLocaleDateString()}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Flow Level:</label>
              <div className="flow-options">
                {['spotting', 'light', 'medium', 'heavy'].map(level => (
                  <label key={level}>
                    <input
                      type="radio"
                      name="flowLevel"
                      value={level}
                      checked={flowLevel === level}
                      onChange={() => setFlowLevel(level)}
                    />
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Symptoms:</label>
              <div className="symptom-options">
                {symptomOptions.map(symptom => (
                  <label key={symptom} className="symptom-checkbox">
                    <input
                      type="checkbox"
                      checked={symptoms.includes(symptom)}
                      onChange={() => handleSymptomToggle(symptom)}
                    />
                    {symptom}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Notes:</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional notes..."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">Save</button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PeriodLogging;