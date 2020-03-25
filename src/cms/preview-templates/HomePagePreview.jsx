import React from 'react';
import PropTypes from 'prop-types';
import { HomePageTemplate } from '../../templates/homepage';

const HomePagePreview = ({ entry, widgetFor }) => {
  return (
    <HomePageTemplate
      image={entry.getIn(['data', 'image'])}
      title={entry.getIn(['data', 'title'])}
      heading={entry.getIn(['data', 'heading'])}
      content={widgetFor('body')}
    />
  );
};

HomePagePreview.propTypes = {
  widgetFor: PropTypes.func,
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default HomePagePreview;
