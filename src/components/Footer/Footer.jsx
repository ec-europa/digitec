/**
 *
 * Footer
 *
 */

import React from 'react';
import epLogo from '../../img/1_EP.svg';
import councilLogo from '../../img/2_Council.svg';
import ecLogo from '../../img/3_EC.svg';

import styles from './Footer.module.scss';

const Footer = () => (
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
          href="http://www.europarl.europa.eu/portal/en"
          className={styles.logoContainer}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={epLogo} alt="European Parliament" className={styles.logo} />
        </a>
        <a
          href="http://www.consilium.europa.eu/en/"
          className={styles.logoContainer}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={councilLogo}
            alt="European Council"
            className={styles.logo}
          />
        </a>
        <a
          href="https://ec.europa.eu/commission/index_en"
          className={styles.logoContainer}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={ecLogo} alt="European Commission" className={styles.logo} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
