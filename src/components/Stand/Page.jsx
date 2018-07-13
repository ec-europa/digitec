/**
 *
 * Stand/Page
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Overdrive from 'react-overdrive';

// Styles
import styles from './Page.module.scss';

const Page = ({ stand, children }) => (
  <section className={styles.container}>
    <div className={styles.header}>
      {stand.picture ? (
        <Overdrive id={`${stand.title}-pic`} className={styles.headerPicture}>
          {stand.picture.type === Img
            ? React.cloneElement(stand.picture, {
                alt: stand.title,
              })
            : React.cloneElement(stand.picture, {
                alt: stand.title,
              })}
        </Overdrive>
      ) : (
        ''
      )}
      <div className={styles.headerTitles}>
        <h3>
          <span className={styles.number}>{stand.number}</span> {stand.title}
        </h3>
        <h4 className={styles.title}>{stand.subtitle}</h4>
      </div>
    </div>
    <div className={styles.description}>{children}</div>
  </section>
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
