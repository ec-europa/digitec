/**
 *
 * Speakers/Page
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './Page.module.scss';

// Components
import EventRow from '../Event/Row';

// Images
import twitterLogo from './twitter.png';

class Page extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.schedule !== this.props.schedule;
  }

  render() {
    // const { speaker, speakerEvents, schedule, onToggleEvent } = this.props;
    const { speaker, events, children } = this.props;

    const sessions =
      events && events.length ? (
        <div>
          <h3>Session{events.length > 1 ? 's' : ''}</h3>
          {events.map(event => (
            <EventRow
              key={event.id}
              event={{
                id: event.id,
                slug: event.fields.slug,
                title: event.frontmatter.title,
                starts: event.frontmatter.starts,
                ends: event.frontmatter.ends,
                venue: event.frontmatter.venue,
                color: event.frontmatter.color,
              }}
              // checked={schedule[event.id]}
              // onToggle={onToggleEvent}
            />
          ))}
        </div>
      ) : (
        ''
      );

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            src={speaker.picture}
            alt={`${speaker.firstname} ${speaker.lastname}`}
            className={styles.headerPicture}
          />
          <div className={styles.headerTitles}>
            <h3>
              {speaker.firstname}{' '}
              <span className={styles.lastname}>{speaker.lastname}</span>
            </h3>
            <h4 className={styles.title}>{speaker.title}</h4>
          </div>
        </div>
        <div className={styles.bio}>{children}</div>
        {speaker.twitter ? (
          <a
            className={styles.twitter}
            href={`https://twitter.com/${speaker.twitter.substr(1)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={twitterLogo} alt="Twitter Feed" /> {speaker.twitter}
          </a>
        ) : null}
        {sessions}
      </div>
    );
  }
}

Page.propTypes = {
  speaker: PropTypes.object,
  // speakerEvents: PropTypes.array,
  schedule: PropTypes.object,
  // onToggleEvent: PropTypes.func,
};

Page.defaultProps = {
  speaker: {},
  schedule: [],
};

export default Page;
