import React, { useState } from "react";
import "./App.css";

const eventsData = [
  { date: "2025-10-10", title: "Team Meeting", description: "Project discussion at 10 AM" },
  { date: "2025-10-15", title: "Hackathon", description: "24-hour coding challenge" },
  { date: "2025-10-20", title: "Presentation", description: "Final project presentation" },
];

const App = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);

  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleDateClick = (day) => {
    const dateStr = `${year}-${(month + 1).toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    setSelectedDate(dateStr);
  };

  const eventsForDate = eventsData.filter((e) => e.date === selectedDate);

  return (
    <div className="calendar-container">
      <h1>📅 Interactive Calendar</h1>
      <h2>
        {today.toLocaleString("default", { month: "long" })} {year}
      </h2>
      <div className="calendar-grid">
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const dateStr = `${year}-${(month + 1)
            .toString()
            .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
          const isSelected = selectedDate === dateStr;
          const hasEvent = eventsData.some((e) => e.date === dateStr);

          return (
            <div
              key={day}
              className={`calendar-day ${isSelected ? "selected" : ""} ${
                hasEvent ? "has-event" : ""
              }`}
              onClick={() => handleDateClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="event-section">
        {selectedDate ? (
          eventsForDate.length > 0 ? (
            eventsForDate.map((event, index) => (
              <div key={index} className="event-card">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            ))
          ) : (
            <p>No events for this date.</p>
          )
        ) : (
          <p>Select a date to see events.</p>
        )}
      </div>
    </div>
  );
};

export default App;
