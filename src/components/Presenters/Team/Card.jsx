/**
 *
 * Team/Card
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import Overdrive from 'react-overdrive';

import styles from '../Card.module.scss';

const Team = ({ team }) => (
  <Link
    className={styles.item}
    to={{
      pathname: team.slug,
      state: { modal: true },
    }}
  >
    {team.picture ? (
      <Overdrive id={`${team.teamName}-pic`}>
        <Img
          sizes={team.picture.sizes}
          className={styles.picture}
          outerWrapperClassName={styles.pictureFrame}
          alt={`${team.teamName}`}
        />
      </Overdrive>
    ) : (
      ''
    )}
    <div className={styles.info}>
      <div className={styles.name}>{team.teamName}</div>
      <div className={styles.name}>{team.teamMembers}</div>
      <div className={styles.title}>{team.intro}</div>
    </div>
  </Link>
);

Team.propTypes = {
  team: PropTypes.object,
};

Team.defaultProps = {
  team: {},
};

export default Team;
