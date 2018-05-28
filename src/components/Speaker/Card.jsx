/**
*
  * Speakers/Speaker
  *
  */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import styles from './Card.module.scss';

const Speaker = ({ speaker }) => {
  return (
    <Link
      className={styles.item}
      to={{
        pathname: speaker.slug,
        state: { modal: true },
      }}
    >
      <div className={styles.pictureFrame}>
        <img
          className={styles.picture}
          src={speaker.picture}
          alt={`${speaker.firstname} ${speaker.lastname}`}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>
          {speaker.firstname}
          {' '}
          <span className={styles.lastname}>{speaker.lastname}</span>
        </div>
        <div className={styles.title}>{speaker.title}</div>
      </div>
    </Link>
  );
}

Speaker.propTypes = {
  speaker: PropTypes.object,
};

Speaker.defaultProps = {
  speaker: {},
};

export default Speaker;
