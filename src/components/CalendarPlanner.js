import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../utils/api';
import { useIndexedDB } from '../utils/storage';

const CalendarPlanner = () => {
  const [events, setEvents] = useState([]);
  const { getAll, add, update, remove } = useIndexedDB('events');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const localEvents = await getAll();
    setEvents(localEvents);

    const remoteEvents = await getEvents();
    setEvents(remoteEvents);
  };

  const handleAddEvent = async (event) => {
    const newEvent = await addEvent(event);
    setEvents([...events, newEvent]);
    await add(newEvent);
  };

  const handleUpdateEvent = async (event) => {
    const updatedEvent = await updateEvent(event);
    setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
    await update(updatedEvent);
  };

  const handleDeleteEvent = async (eventId) => {
    await deleteEvent(eventId);
    setEvents(events.filter((e) => e.id !== eventId));
    await remove(eventId);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedEvents = Array.from(events);
    const [movedEvent] = reorderedEvents.splice(result.source.index, 1);
    reorderedEvents.splice(result.destination.index, 0, movedEvent);

    setEvents(reorderedEvents);
  };

  return (
    <div className="calendar-planner">
      <h2>Calendar Planner</h2>
      <button onClick={() => handleAddEvent({ title: 'New Event', start: new Date(), end: new Date() })}>
        Add Event
      </button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="events">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {events.map((event, index) => (
                <Draggable key={event.id} draggableId={event.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="event"
                    >
                      <h3>{event.title}</h3>
                      <p>{event.start.toString()}</p>
                      <p>{event.end.toString()}</p>
                      <button onClick={() => handleUpdateEvent({ ...event, title: 'Updated Event' })}>
                        Update
                      </button>
                      <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default CalendarPlanner;
