/**
 *
 * Event/List
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import styles from './List.module.scss';

const List = ({
  events,
  // schedule,
  // onToggle,
  // location,
}) => {
  const eventsDisplay = [];

  const eventsByTimeslot = [];
  events.forEach(event => {
    if (!eventsByTimeslot[event.starts]) {
      eventsByTimeslot[event.starts] = [];
    }
    eventsByTimeslot[event.starts].push(event);
  });

  Object.keys(eventsByTimeslot).forEach(start => {
    const eventsList = eventsByTimeslot[start];

    const eventsRows = eventsList.map(event => (
      <Row
        key={event.slug}
        event={event}
        // checked={schedule[event.id]}
        // onToggle={onToggle}
        displayTime={false}
        // location={location}
      />
    ));

    const eventsEnds = eventsList[0].ends ? (
      <time>{eventsList[0].ends}</time>
    ) : null;

    eventsDisplay.push(
      <div className={styles.block} key={eventsList[0].starts}>
        <div className={styles.timeslot}>
          <time>{eventsList[0].starts}</time>
          {eventsEnds ? ' - ' : ''}
          {eventsEnds}
        </div>
        <ul style={{ flexGrow: 1, margin: 0, padding: 0 }}>{eventsRows}</ul>
      </div>
    );
  });

  return eventsDisplay;
};

List.propTypes = {
  events: PropTypes.array,
  // schedule: PropTypes.object,
  // onToggle: PropTypes.func,
  // location: PropTypes.object,
};

List.defaultProps = {
  events: [],
  // schedule: [],
};

export default List;
