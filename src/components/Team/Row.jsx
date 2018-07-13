/**
 *
 * Speaker/Row
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import Overdrive from 'react-overdrive';

import styles from './Row.module.scss';

const Row = ({ team }) => (
  <Link
    className={styles.teamContainer}
    to={{
      pathname: team.slug,
      state: { modal: true },
    }}
  >
    <Overdrive id={`${team.teamName}-pic`} className={styles.speakerPicture}>
      <Img
        sizes={team.picture.childImageSharp.sizes}
        alt={`${team.teamName}`}
      />
    </Overdrive>
    <div className={styles.speakerInfo}>
      <h3>{team.teamName}</h3>
      <h4 className={styles.title}>{team.intro}</h4>
    </div>
  </Link>
);

Row.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.string,
    teamName: PropTypes.string,
    intro: PropTypes.string,
    picture: PropTypes.string,
  }),
};

Row.defaultProps = {
  team: {},
};

export default Row;
