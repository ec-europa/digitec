import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveEmbed from 'react-responsive-embed';

import SpeakerRow from '../Presenters/Speaker/Row';
import TeamRow from '../Presenters/Team/Row';

import styles from './Page.module.scss';

const Page = ({ event, speakers, teams, children, videos }) => {
  const startsAt = <time>{event.starts}</time>;
  const endsAt = event.ends ? <time>{event.ends}</time> : null;

  let venue = null;
  if (event.venue && event.venue.length > 0) {
    venue = `, ${event.venue}`;
  }

  const videosBlock =
    videos && videos.length ? (
      <>
        <h2>Video{videos.length > 1 ? 's' : ''}</h2>
        {videos.map((videoNode) => (
          <ResponsiveEmbed
            className={styles.video}
            key={videoNode.video}
            src={videoNode.video}
            allowFullScreen
          />
        ))}
      </>
    ) : null;

  const speakersBlock =
    speakers && speakers.length ? (
      <div>
        <h2>Speaker{speakers.length > 1 ? 's' : ''}</h2>
        {speakers.map((speaker) => (
          <SpeakerRow
            key={speaker.fields.slug}
            speaker={{
              slug: speaker.fields.slug,
              picture: speaker.frontmatter.picture,
              firstname: speaker.frontmatter.firstname,
              lastname: speaker.frontmatter.lastname,
              title: speaker.frontmatter.title,
            }}
          />
        ))}
      </div>
    ) : null;

  const teamsBlock =
    teams && teams.length ? (
      <div>
        <h2>Team{teams.length > 1 ? 's' : ''}</h2>
        {teams.map((team) => (
          <TeamRow
            key={team.fields.slug}
            team={{
              slug: team.fields.slug,
              picture: team.frontmatter.picture,
              teamName: team.frontmatter.teamName,
              teamMembers: team.frontmatter.teamMembers,
            }}
          />
        ))}
      </div>
    ) : null;

  return (
    <section className={styles.pageContainer}>
      <h1>{event.title}</h1>
      <h2>
        {startsAt}
        {event.ends ? ' - ' : ''}
        {endsAt}
        {venue}
      </h2>
      <div className={styles.name}>
        {event.picture && (
          <img
            className={styles.picture}
            src={event.picture}
            alt={event.title}
          />
        )}
        {children}
      </div>
      {videosBlock}
      {teamsBlock}
      {speakersBlock}
    </section>
  );
};

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  event: PropTypes.object,
  speakers: PropTypes.array,
  teams: PropTypes.array,
  videos: PropTypes.array,
};

Page.defaultProps = {
  event: {},
  videos: [],
  speakers: [],
  teams: [],
};

export default Page;
