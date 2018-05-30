/**
 *
 * Speaker/Row
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import styles from './Row.module.scss';

const Row = ({ speaker }) => (
  <Link
    className={styles.speakerContainer}
    to={{
      pathname: speaker.slug,
      state: { modal: true },
    }}
  >
    <div className={styles.speakerPicture}>
      <img
        src={speaker.picture}
        alt={`${speaker.firstname} ${speaker.lastname}`}
      />
    </div>
    <div className={styles.speakerInfo}>
      <h3>
        {speaker.firstname}{' '}
        <span className={styles.lastname}>{speaker.lastname}</span>
      </h3>
      <h4 className={styles.title}>{speaker.title}</h4>
    </div>
  </Link>
);

Row.propTypes = {
  speaker: PropTypes.shape({
    id: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    title: PropTypes.string,
    picture: PropTypes.string,
  }),
};

Row.defaultProps = {
  speaker: {},
};

export default Row;
