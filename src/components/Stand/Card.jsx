/**
 *
 * Stand/Card
 *
 */

import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

import styles from './Card.module.scss';

const Stand = ({ stand }) => (
    <Link
      className={styles.item}
      to={{
        pathname: stand.slug,
        state: { modal: true },
      }}
    >
      <div className={styles.pictureFrame}>
        <img
          className={styles.picture}
          src={stand.visual}
          alt={stand.title}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.number}>{stand.number}</div>
        <div className={styles.name}>
          {stand.title}
        </div>
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
