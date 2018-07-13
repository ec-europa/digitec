/**
 *
 * Speakers/Page
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Overdrive from 'react-overdrive';

// Styles
import styles from './Page.module.scss';

// Components
import EventRow from '../Event/Row';

// Images
import twitterLogo from './twitter.png';

const Page = ({ team, events, children }) => {
  const sessions =
    events && events.length && events.filter(e => e).length ? (
      <Fragment>
        <h3 className={styles.sessionsTitle}>
          Session{events.length > 1 ? 's' : ''}
        </h3>
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
        <Overdrive id={`${team.teamName}-pic`} className={styles.headerPicture}>
          {team.picture.type === Img
            ? React.cloneElement(team.picture, {
                alt: `${team.teamName}`,
              })
            : React.cloneElement(team.picture, {
                alt: `${team.teamName}`,
              })}
        </Overdrive>
        <div className={styles.headerTitles}>
          <h3>{team.teamName}</h3>
          <h4 className={styles.title}>{team.intro}</h4>
          {team.twitter ? (
            <a
              className={styles.twitter}
              href={`https://twitter.com/${team.twitter.substr(1)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitterLogo} alt="Twitter Feed" /> {team.twitter}
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
  team: PropTypes.object,
  events: PropTypes.array,
  children: PropTypes.node,
};

Page.defaultProps = {
  team: {},
  events: [],
};

export default Page;
