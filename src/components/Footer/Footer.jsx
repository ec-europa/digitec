/**
 *
 * Footer
 *
 */

import React from 'react';
import styles from './Footer.module.scss';
import commissionLogo from './commission.png';
import parliamentLogo from './parliament.png';

class Footer extends React.PureComponent {
  render() {
    return (
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
              href="http://ec.europa.eu/index_en.htm"
              className={styles.logoContainer}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={commissionLogo}
                alt="European Commission"
                className={styles.logo}
              />
            </a>
            <a
              href="http://www.europarl.europa.eu/portal/en"
              className={styles.logoContainer}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={parliamentLogo}
                alt="European Parliament"
                className={styles.logo}
              />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
