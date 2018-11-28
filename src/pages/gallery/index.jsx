import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

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
    return {
      srcset: optimizedImage.node.sizes.srcSet,
      sizes: optimizedImage.node.sizes.sizes,
      ...item.image,
    };
  });

  return (
    <Fragment>
      <section className={containerStyles.container}>
        <Helmet title="Gallery" />
        <h1 className={contentStyles.fs10}>Gallery</h1>
        <div className={containerStyles.cardsContainer}>
          <p>
            You can see more pictures from the even from{' '}
            <a
              href="https://twitter.com/i/moments/1067008611396841472"
              target="_blank"
              rel="noopener noreferrer"
            >
              this moment
            </a>.
          </p>
        </div>
      </section>
      <Gallery photos={photos} />
    </Fragment>
  );
};

export default GalleryPage;

GalleryPage.propTypes = {
  data: PropTypes.shape({
    allImageSharp: PropTypes.shape({
      edges: PropTypes.object,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query GetStaticSharpImages {
    allImageSharp(filter: { id: { regex: "/static/img/" } }) {
      edges {
        node {
          id
          sizes {
            sizes
            srcSet
          }
        }
      }
    }
  }
`;
