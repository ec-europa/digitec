/**
 *
 * Stand/Card
 *
 */

import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Overdrive from 'react-overdrive';

import styles from './Card.module.scss';

const Stand = ({ stand }) => (
  <Link className={styles.item} to={{ pathname: stand.slug }}>
    {stand.picture ? (
      <Overdrive id={`${stand.title}-pic`}>
        <Img
          fluid={stand.picture.fluid}
          className={styles.picture}
          outerWrapperClassName={styles.pictureFrame}
          alt={stand.title}
        />
      </Overdrive>
    ) : (
      ''
    )}
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
