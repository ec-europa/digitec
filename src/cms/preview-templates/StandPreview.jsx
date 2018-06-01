import React from 'react';
import PropTypes from 'prop-types';
import { StandTemplate } from '../../templates/stand';

const StandPreview = ({ entry, widgetFor }) => (
  <StandTemplate
    content={widgetFor('body')}
    title={entry.getIn(['data', 'title'])}
    subtitle={entry.getIn(['data', 'subtitle'])}
    number={entry.getIn(['data', 'number'])}
    picture={<img src={entry.getIn(['data', 'picture'])} />}
  />
);

StandPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default StandPreview;
