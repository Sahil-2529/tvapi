// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styling

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get('http://api.tvmaze.com/schedule?country=US');
        setSchedule(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="schedule-container">
      <h2 className="schedule-title">TV Schedule (US)</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul className="schedule-list">
          {schedule.map((show) => (
            <li key={show.id} className="show-item">
              <span className="show-name">{show.name}</span>
              <span className="show-details">
                {show.airtime} - {show.network.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div className="app-container">
      <Schedule />
    </div>
  );
};

export default App;
