import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import EventsList from '../components/Event/List';
import containerStyles from '../utils/_container.module.scss';
import contentStyles from '../utils/_content.module.scss';

const ProgrammePage = props => {
  const { data } = props;
  const { edges: events } = data.allMarkdownRemark;

  const mappedEvents = events.map(({ node: event }) => ({
    id: event.id,
    slug: event.fields.slug,
    title: event.frontmatter.title,
    starts: event.frontmatter.starts,
    ends: event.frontmatter.ends,
    venue: event.frontmatter.venue,
    color: event.frontmatter.color
  }));

  return (
    <div className={containerStyles.container}>
      <div className={containerStyles.header}>
        <h1 className={contentStyles.fs9}>Programme</h1>
      </div>
      <div className={containerStyles.intro}>
        <p>
          Choose and save your favourite sessions to
          {' '}
          <Link to={'/my-digitec'}>My DIGITEC</Link>
          .
        </p>
      </div>
      <EventsList
        events={mappedEvents}
        // schedule={schedule}
        // onToggle={onToggleEvent}
        // location={location}
      />
    </div>
  );
};

ProgrammePage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export default ProgrammePage;

export const pageQuery = graphql`
  query ProgrammeQuery {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/events/" } }) {
      edges {
        node {
          html
          id
          fields {
            slug
          }
          frontmatter {
            id
            title
            starts
            ends
            venue
            color
          }
        }
      }
    }
  }
`;
