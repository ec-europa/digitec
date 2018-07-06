import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
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
    color: event.frontmatter.color,
    order: event.frontmatter.order,
    readMore: event.frontmatter.readMore,
  }));

  return (
    <section className={containerStyles.container}>
      <Helmet title="Programme" />
      <div className={containerStyles.header}>
        <h1 className={contentStyles.fs10}>Programme</h1>
      </div>
      <EventsList events={mappedEvents} />
    </section>
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___starts], order: ASC }
      filter: { fileAbsolutePath: { regex: "/events/" } }
    ) {
      edges {
        node {
          html
          fields {
            slug
          }
          frontmatter {
            title
            starts
            ends
            venue
            color
            readMore
            order
          }
        }
      }
    }
  }
`;