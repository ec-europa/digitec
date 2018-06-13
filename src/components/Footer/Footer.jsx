/**
 *
 * Footer
 *
 */

import React from 'react';
import Img from 'gatsby-image';

import styles from './Footer.module.scss';

const Footer = ({ images }) => (
  <footer className={styles.container}>
    <div className={styles.innerContainer}>
      <div className={`${styles.section} ${styles.left}`}>
        <a
          href="http://europa.eu/cookies/index_en.htm"
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Cookies
        </a>
        <a
          href="http://europa.eu/geninfo/legal_notices_en.htm"
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Legal notice
        </a>
        <a
          href="mailto:DIGITEC-CONFERENCE@ec.europa.eu"
          className={styles.link}
        >
          Contact
        </a>
        <a
          href="http://europa.eu/geninfo/query/index.do"
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Search
        </a>
      </div>
      <div className={`${styles.section} ${styles.right}`}>
        <a
          href="http://www.europarl.europa.eu"
          className={styles.logoContainer}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Img
            sizes={images.logoEU.sizes}
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
            sizes={images.logoCouncil.sizes}
            alt="European Council"
            className={styles.logo}
          />
        </a>
        <a
          href="https://ec.europa.eu"
          className={styles.logoContainer}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Img
            sizes={images.logoEC.sizes}
            alt="European Commission"
            className={styles.logo}
          />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
