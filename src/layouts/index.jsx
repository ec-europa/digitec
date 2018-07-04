import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import 'normalize.css/normalize.css';
import './global.scss';

import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import styles from './layout.module.scss';

import favicon16 from '../img/favicon-16.png';
import favicon32 from '../img/favicon-32.png';
import favicon48 from '../img/favicon-48.png';
import favicon57 from '../img/favicon-57.png';
import favicon76 from '../img/favicon-76.png';
import favicon120 from '../img/favicon-120.png';
import favicon128 from '../img/favicon-128.png';
import favicon144 from '../img/favicon-144.png';
import favicon152 from '../img/favicon-152.png';
import favicon196 from '../img/favicon-196.png';

const TemplateWrapper = ({ location, children }) => (
  <div className={styles.container}>
    <Helmet
      defaultTitle="DIGITEC 2018"
      titleTemplate="%s | DIGITEC 2018"
      meta={[
        { name: 'description', content: 'DIGITEC: Innovation Space' },
        { name: 'keywords', content: 'digitec, conference, innovation' },
      ]}
    >
      <html lang="en" />

      <link rel="apple-touch-icon-precomposed" sizes="57x57" href={favicon57} />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="144x144"
        href={favicon144}
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="120x120"
        href={favicon120}
      />
      <link rel="apple-touch-icon-precomposed" sizes="76x76" href={favicon76} />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="152x152"
        href={favicon152}
      />
      <link rel="icon" type="image/png" href={favicon196} sizes="196x196" />
      <link rel="icon" type="image/png" href={favicon48} sizes="48x48" />
      <link rel="icon" type="image/png" href={favicon32} sizes="32x32" />
      <link rel="icon" type="image/png" href={favicon16} sizes="16x16" />
      <link rel="icon" type="image/png" href={favicon128} sizes="128x128" />
    </Helmet>
    <Navbar location={location} />
    <main className={styles.main}>
      <div>{children()}</div>
    </main>
    <Footer />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  // eslint-disable-next-line
  location: PropTypes.object.isRequired,
};

TemplateWrapper.defaultProps = {
  children: () => {},
};

export default TemplateWrapper;
