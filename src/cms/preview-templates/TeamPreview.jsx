import React from 'react';
import PropTypes from 'prop-types';
import { TeamTemplate } from '../../templates/team';

const TeamPreview = ({ entry, widgetFor }) => (
  <TeamTemplate
    content={widgetFor('body')}
    teamName={entry.getIn(['data', 'teamName'])}
    intro={entry.getIn(['data', 'intro'])}
    picture={<img src={entry.getIn(['data', 'picture'])} />}
  />
);

TeamPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default TeamPreview;
