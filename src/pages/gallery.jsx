import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import containerStyles from '../utils/_container.module.scss';
import contentStyles from '../utils/_content.module.scss';

const GalleryPage = props => {
  const { data } = props;
  const { edges: images } = data.allFile;

  return (
    <section className={containerStyles.container}>
      <Helmet title="Gallery" />
      <h1 className={contentStyles.fs10}>Gallery</h1>
      <div className={containerStyles.cardsContainer}>
        <p>
          Selected pictures from the sessions and expo area. Find more photos in
          this album.
        </p>
        {images.map(({ node: image }) => <div>{image.relativePath}</div>)}
      </div>
    </section>
  );
};

export default GalleryPage;

GalleryPage.propTypes = {
  data: PropTypes.shape({
    allFile: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query GalleryImages {
    allFile(filter: { relativePath: { regex: "/gallery//" } }) {
      edges {
        node {
          id
          relativePath
        }
      }
    }
  }
`;
