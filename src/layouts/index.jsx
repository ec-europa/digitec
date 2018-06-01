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
    <Helmet defaultTitle="DIGITEC 2018" titleTemplate="%s | DIGITEC 2018" />
    <Navbar location={location} />
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
    allImageSharp {
      edges {
        node {
          id
          sizes {
            base64
            tracedSVG
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
            originalImg
            originalName
          }
        }
      }
    }
  }
`;
