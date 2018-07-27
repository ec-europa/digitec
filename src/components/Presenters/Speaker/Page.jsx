/**
 * Speakers/Page
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Overdrive from 'react-overdrive';

// Redux actions
import { toggleEvent } from '../../../store/modules/schedule';

// Styles
import styles from '../Page.module.scss';

// Components
import EventRow from '../../Event/Row';

// Images
import twitterLogo from '../twitter.png';

const Page = props => {
  const { speaker, events, schedule, onToggleEvent, children } = props;

  const sessions =
    events && events.length && events.filter(e => e).length ? (
      <Fragment>
        <h3 className={styles.sessionsTitle}>
          Session{events.length > 1 ? 's' : ''}
        </h3>
        {events.map(event => (
          <EventRow
            key={event.fields.slug}
            checked={schedule[event.id]}
            onToggleEvent={onToggleEvent}
            event={{
              id: event.id,
              slug: event.fields.slug,
              title: event.frontmatter.title,
              starts: event.frontmatter.starts,
              ends: event.frontmatter.ends,
              venue: event.frontmatter.venue,
              color: event.frontmatter.color,
              readMore: event.frontmatter.readMore,
            }}
          />
        ))}
      </Fragment>
    ) : (
      ''
    );

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        {speaker.picture ? (
          <Overdrive
            id={`${speaker.firstname}-${speaker.lastname}-pic`}
            className={styles.headerPicture}
          >
            {speaker.picture.type === Img
              ? React.cloneElement(speaker.picture, {
                  alt: `${speaker.firstname} ${speaker.lastname}`,
                })
              : React.cloneElement(speaker.picture, {
                  alt: `${speaker.firstname} ${speaker.lastname}`,
                })}
          </Overdrive>
        ) : (
          ''
        )}
        <div className={styles.headerTitles}>
          <h3>
            {speaker.firstname}{' '}
            <span className={styles.lastname}>{speaker.lastname}</span>
          </h3>
          <h4 className={styles.title}>{speaker.title}</h4>
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
        </div>
      </div>
      <div className={styles.bio}>{children}</div>
      {sessions}
    </section>
  );
};

Page.propTypes = {
  speaker: PropTypes.object,
  events: PropTypes.array,
  schedule: PropTypes.object,
  onToggleEvent: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Page.defaultProps = {
  speaker: {},
  events: [],
};

function mapStateToProps(state) {
  return {
    schedule: state.schedule,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onToggleEvent: event => {
      dispatch(toggleEvent(event));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);