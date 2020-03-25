import React from 'react';
import PropTypes from 'prop-types';
import { TeamTemplate } from '../../templates/team';

const TeamPreview = ({ entry, widgetFor }) => (
  <TeamTemplate
    content={widgetFor('body')}
    teamName={entry.getIn(['data', 'teamName'])}
    teamMembers={entry.getIn(['data', 'teamMembers'])}
    picture={<img src={entry.getIn(['data', 'picture'])} alt="" />}
  />
);

TeamPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default TeamPreview;
