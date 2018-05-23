import React from 'react';
import PropTypes from 'prop-types';
import { SpeakerTemplate } from '../../templates/speaker';

const SpeakerPreview = ({ entry, widgetFor }) => (
  <SpeakerTemplate
    content={widgetFor('body')}
    firstname={entry.getIn(['data', 'firstname'])}
    lastname={entry.getIn(['data', 'lastname'])}
    picture={entry.getIn(['data', 'picture'])}
    title={entry.getIn(['data', 'title'])}
  />
);

SpeakerPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default SpeakerPreview;
