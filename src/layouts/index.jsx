import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import 'normalize.css/normalize.css';
import './global.scss';

import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import styles from './layout.module.scss';

const TemplateWrapper = ({ children }) => (
  <div className={styles.container}>
    <Helmet title="DIGITEC 2018" />
    <Navbar />
    <main className={styles.main}>{children()}</main>
    <Footer />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

TemplateWrapper.defaultProps = {
  children: () => {},
};

export default TemplateWrapper;
