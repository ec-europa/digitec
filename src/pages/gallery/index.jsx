import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Gallery from '../../components/Gallery/Gallery';

import containerStyles from '../../utils/_container.module.scss';
import contentStyles from '../../utils/_content.module.scss';

const GalleryPage = ({ data }) => {
  const staticImages = data.allImageSharp.edges;
  // File type collection managed by the user in NetlifyCMS.
  // The /static/admin/config.yml file contains settings for the shape of the image.
  const userSelected = require('./gallery.json'); // eslint-disable-line global-require

  const photos = userSelected.Images.map(item => {
    const { image } = item;
    // ImageSharp node for the same image as the user-selected one.
    const optimizedImage = staticImages.find(node =>
      node.node.id.includes(image.src)
    );

    if (optimizedImage) {
      return {
        srcSet: optimizedImage.node.fluid.srcSet,
        sizes: optimizedImage.node.fluid.sizes,
        width: 600,
        height: 400,
        ...item.image,
      };
    }
  }).filter(i => i);

  return (
    <>
      <section className={containerStyles.container}>
        <Helmet title="Gallery" />
        <h1 className={contentStyles.fs10}>Gallery</h1>
        <div className={containerStyles.cardsContainer}>
          <p>
            You can see more photos from the event in #digitec18{' '}
            <a
              href="https://twitter.com/i/moments/1067008611396841472"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter moment
            </a>
            .
          </p>
        </div>
      </section>
      <Gallery photos={photos} />
    </>
  );
};

export default GalleryPage;

GalleryPage.propTypes = {
  data: PropTypes.shape({
    allImageSharp: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query GetStaticSharpImages {
    allImageSharp {
      edges {
        node {
          id
          fluid {
            sizes
            srcSet
          }
        }
      }
    }
  }
`;
