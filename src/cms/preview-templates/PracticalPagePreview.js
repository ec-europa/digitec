import React from 'react';
import PropTypes from 'prop-types';
import { PracticalPageTemplate } from '../../templates/practical-page';

const PracticalPagePreview = ({ entry, widgetFor }) => (
  <PracticalPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
);

PracticalPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default PracticalPagePreview;
