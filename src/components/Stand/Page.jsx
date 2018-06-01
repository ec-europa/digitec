/**
 *
 * Stand/Page
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

// Styles
import styles from './Page.module.scss';

const Page = ({ stand, children }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      {stand.picture.type === Img
        ? React.cloneElement(stand.picture, {
            alt: stand.title,
            outerWrapperClassName: styles.headerPicture,
          })
        : React.cloneElement(stand.picture, {
            alt: stand.title,
            className: styles.headerPicture,
          })}
      <div className={styles.headerTitles}>
        <h3>
          <span className={styles.number}>{stand.number}</span> {stand.title}
        </h3>
        <h4 className={styles.title}>{stand.subtitle}</h4>
      </div>
    </div>
    <div className={styles.description}>{children}</div>
  </div>
);

Page.propTypes = {
  stand: PropTypes.object,
  children: PropTypes.node,
};

Page.defaultProps = {
  stand: {},
  children: null,
};

export default Page;
