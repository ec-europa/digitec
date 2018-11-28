import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import Gallery from '../../components/Gallery/Gallery';

import containerStyles from '../../utils/_container.module.scss';
import contentStyles from '../../utils/_content.module.scss';

const GalleryPage = () => {
  // This could potentially be fed into here
  // by using gatsby-source-filesystem and
  // querying the json from GraphQL page query.
  // No benefits to make rounds to GraphQL for this usecase.
  const gallery = require('./gallery.json'); // eslint-disable-line global-require

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
      <Gallery photos={gallery.Images} />
    </Fragment>
  );
};

export default GalleryPage;
