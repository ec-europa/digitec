/**
 *
 * Stand/Card
 *
 */

import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Overdrive from 'react-overdrive';

import styles from './Card.module.scss';

const Stand = ({ stand }) => (
  <Link
    className={styles.item}
    to={{
      pathname: stand.slug,
      state: { modal: true },
    }}
  >
    <Overdrive id={`${stand.title}-pic`}>
      <Img
        sizes={stand.picture.sizes}
        className={styles.picture}
        outerWrapperClassName={styles.pictureFrame}
        alt={stand.title}
      />
    </Overdrive>
    <div className={styles.info}>
      <div className={styles.number}>{stand.number}</div>
      <div className={styles.name}>{stand.title}</div>
      <div className={styles.title}>{stand.subtitle}</div>
    </div>
  </Link>
);

Stand.propTypes = {
  stand: PropTypes.object,
};

Stand.defaultProps = {
  stand: {},
};

export default Stand;
