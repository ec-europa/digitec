import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import 'normalize.css/normalize.css';
import './global.scss';

import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import styles from './layout.module.scss';

const TemplateWrapper = ({ location, children, data }) => (
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
    <Navbar location={location} images={data} />
    <main className={styles.main}>
      <div>{children()}</div>
    </main>
    <Footer images={data} />
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

export const query = graphql`
  query GatsbyImageSampleQuery {
    logoEuropa: imageSharp(id: { regex: "/eu-logo.jpg/" }) {
      sizes(maxWidth: 60, quality: 80) {
        ...GatsbyImageSharpSizes_withWebp_noBase64
      }
    }
    logoEC: imageSharp(id: { regex: "/commission.jpg/" }) {
      sizes(maxWidth: 140, quality: 80) {
        ...GatsbyImageSharpSizes_withWebp_noBase64
      }
    }
    logoEU: imageSharp(id: { regex: "/parliament.jpg/" }) {
      sizes(maxWidth: 140, quality: 80) {
        ...GatsbyImageSharpSizes_withWebp_noBase64
      }
    }
    logoCouncil: imageSharp(id: { regex: "/council.jpg/" }) {
      sizes(maxWidth: 140, quality: 80) {
        ...GatsbyImageSharpSizes_withWebp_noBase64
      }
    }
  }
`;
