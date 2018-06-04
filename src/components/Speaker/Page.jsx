/**
 *
 * Speakers/Page
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

// Styles
import styles from './Page.module.scss';

// Components
import EventRow from '../Event/Row';

// Images
import twitterLogo from './twitter.png';

const Page = ({ speaker, events, children }) => {
  const sessions =
    events && events.length ? (
      <div>
        <h3>Session{events.length > 1 ? 's' : ''}</h3>
        {events.map(event => (
          <EventRow
            key={event.fields.slug}
            event={{
              id: event.id,
              slug: event.fields.slug,
              title: event.frontmatter.title,
              starts: event.frontmatter.starts,
              ends: event.frontmatter.ends,
              venue: event.frontmatter.venue,
              color: event.frontmatter.color,
            }}
          />
        ))}
      </div>
    ) : (
      ''
    );

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        {speaker.picture.type === Img
          ? React.cloneElement(speaker.picture, {
              alt: `${speaker.firstname} ${speaker.lastname}`,
              outerWrapperClassName: styles.headerPicture,
            })
          : React.cloneElement(speaker.picture, {
              alt: `${speaker.firstname} ${speaker.lastname}`,
              className: styles.headerPicture,
            })}
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
    </section>
  );
};

Page.propTypes = {
  speaker: PropTypes.object,
  events: PropTypes.array,
  children: PropTypes.node,
};

Page.defaultProps = {
  speaker: {},
  events: [],
};

export default Page;
