/**
 *
 * Team/Row
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import Overdrive from 'react-overdrive';

import styles from '../Row.module.scss';

const Row = ({ team }) => (
  <Link className={styles.presenterContainer} to={{ pathname: team.slug }}>
    {team.picture ? (
      <Overdrive
        id={`${team.teamName}-pic`}
        className={styles.presenterPicture}
      >
        <Img
          fluid={team.picture.childImageSharp.fluid}
          alt={`${team.teamName}`}
        />
      </Overdrive>
    ) : (
      ''
    )}
    <div className={styles.presenterInfo}>
      <h3>{team.teamName}</h3>
      <p className={styles.presenterParagraph}>{team.teamMembers}</p>
    </div>
  </Link>
);

Row.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.string,
    teamName: PropTypes.string,
    teamMembers: PropTypes.string,
    intro: PropTypes.string,
    picture: PropTypes.string,
  }),
};

Row.defaultProps = {
  team: {},
};

export default Row;
