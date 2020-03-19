/**
 *
 * Speaker/Row
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import Overdrive from 'react-overdrive';

import styles from '../Row.module.scss';

const Row = ({ speaker }) => (
  <Link className={styles.presenterContainer} to={{ pathname: speaker.slug }}>
    {speaker.picture ? (
      <Overdrive
        id={`${speaker.firstname}-${speaker.lastname}-pic`}
        className={styles.presenterPicture}
      >
        <Img
          fluid={speaker.picture.childImageSharp.fluid}
          alt={`${speaker.firstname} ${speaker.lastname}`}
        />
      </Overdrive>
    ) : (
      ''
    )}
    <div className={styles.presenterInfo}>
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
