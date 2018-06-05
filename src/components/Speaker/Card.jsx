/**
 *
 * Speakers/Speaker
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import Overdrive from 'react-overdrive';

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
      <Overdrive id={`${speaker.firstname}-${speaker.lastname}-pic`}>
        <Img
          sizes={speaker.picture.sizes}
          className={styles.picture}
          outerWrapperClassName={styles.pictureFrame}
          alt={`${speaker.firstname} ${speaker.lastname}`}
        />
      </Overdrive>
      <div className={styles.info}>
        <div className={styles.name}>
          {speaker.firstname}{' '}
          <span className={styles.lastname}>{speaker.lastname}</span>
        </div>
        <div className={styles.title}>{speaker.title}</div>
      </div>
    </Link>
  );
};

Speaker.propTypes = {
  speaker: PropTypes.object,
};

Speaker.defaultProps = {
  speaker: {},
};

export default Speaker;
