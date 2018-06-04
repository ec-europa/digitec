/**
 *
 * Speaker/Row
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

import styles from './Row.module.scss';

const Row = ({ speaker }) => (
  <Link
    className={styles.speakerContainer}
    to={{
      pathname: speaker.slug,
      state: { modal: true },
    }}
  >
    <Img
      sizes={speaker.picture.childImageSharp.sizes}
      alt={`${speaker.firstname} ${speaker.lastname}`}
      outerWrapperClassName={styles.speakerPicture}
    />
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
