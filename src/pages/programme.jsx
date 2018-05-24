import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import containerStyles from '../utils/_container.module.scss';
import contentStyles from '../utils/_content.module.scss';

const ProgrammePAge = props => {
  const { data } = props;
  const { edges: events } = data.allMarkdownRemark;

  return (
    <section className={containerStyles.container}>
      <h1 className={contentStyles.fs9}>Programme</h1>
      {events.map(({ node: event }) => (
        <div
          className={contentStyles.content}
          style={{ border: '1px solid #eaecee', padding: '2em 4em' }}
          key={event.id}
        >
          <p>
            <Link className="has-text-primary" to={event.fields.slug}>
              {event.frontmatter.title}
              from {event.frontmatter.starts}
              to {event.frontmatter.ends}
              where {event.frontmatter.venue}
            </Link>
          </p>
        </div>
      ))}
    </section>
  );
};

ProgrammePAge.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export default ProgrammePAge;

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
          }
        }
      }
    }
  }
`;
