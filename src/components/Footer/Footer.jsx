/**
 *
 * Footer
 *
 */

import React from 'react';
import Img from 'gatsby-image';

import styles from './Footer.module.scss';

const getSizes = (images, originalImg) => {
  const img = images.allImageSharp.edges.filter(
    edge => edge.node.sizes.originalName === originalImg
  );

  if (img) {
    return img[0].node.sizes;
  }
  return null;
};

const Footer = ({ images }) => (
  <footer className={styles.container}>
    <div className={styles.innerContainer}>
      <div className={`${styles.section} ${styles.left}`}>
        <a
          href="http://europa.eu/cookies/index_en.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cookies
        </a>
        <a
          href="http://europa.eu/geninfo/legal_notices_en.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Legal notice
        </a>
        <a href="mailto:DIGITEC-CONFERENCE@ec.europa.eu">Contact</a>
        <a
          href="http://europa.eu/geninfo/query/index.do"
          target="_blank"
          rel="noopener noreferrer"
        >
          Search
        </a>
      </div>
      <div className={`${styles.section} ${styles.right}`}>
        <a
          href="https://ec.europa.eu"
          className={styles.logoContainer}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Img
            sizes={getSizes(images, 'commission.png')}
            alt="European Commission"
            className={styles.logo}
          />
        </a>
        <a
          href="http://www.europarl.europa.eu"
          className={styles.logoContainer}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Img
            sizes={getSizes(images, 'parliament.png')}
            alt="European Parliament"
            className={styles.logo}
          />
        </a>
        <a
          href="https://www.coe.int"
          className={styles.logoContainer}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Img
            sizes={getSizes(images, 'council.png')}
            alt="European Council"
            className={styles.councilLogo}
          />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
