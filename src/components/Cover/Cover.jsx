/**
 *
 * Cover
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import styles from './Cover.module.scss';

const Cover = ({ image, title, heading, hashtag }) => (
  <div className={styles.coverContainer}>
    <Img
      sizes={image.sizes}
      alt="DIGITEC 2018"
      // outerWrapperClassName={styles.coverImageContainer}
      // style={{ height: '100%' }}
      role="presentation"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }}
    />
    <div className={styles.coverTitleContainer}>
      <div className={styles.coverTitleContainerRow}>
        <h1>{title}</h1>
        <h2>{heading}</h2>
        <h2>
          <a
            href={`https://twitter.com/hashtag/${hashtag}`}
            className={styles.coverTwitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            {hashtag}
          </a>
        </h2>
      </div>
    </div>
  </div>
);

Cover.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  hashtag: PropTypes.string.isRequired,
};

export default Cover;
