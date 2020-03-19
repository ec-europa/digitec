import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import Overdrive from 'react-overdrive';

import styles from '../Card.module.scss';

const Team = ({ team }) => (
  <Link className={styles.item} to={team.slug}>
    {team.picture && (
      <Overdrive id={`${team.teamName}-pic`}>
        <Img
          fluid={team.picture.fluid}
          className={styles.picture}
          outerWrapperClassName={styles.pictureFrame}
          alt={`${team.teamName}`}
        />
      </Overdrive>
    )}
    <div className={styles.info}>
      <div className={styles.name}>{team.teamName}</div>
      <div className={styles.name}>{team.teamMembers}</div>
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
