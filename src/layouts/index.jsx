import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import 'normalize.css/normalize.css';
import './global.scss';

import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import styles from './layout.module.scss';

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
