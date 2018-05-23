import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

const ProgrammePAge = props => {
  const { data } = props;
  const { edges: events } = data.allMarkdownRemark;

  return (
    <section className="section">
      <div className="container">
        <div className="content">
          <h1 className="has-text-weight-bold is-size-2">Programme</h1>
        </div>
        {events.map(({ node: event }) => (
          <div
            className="content"
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
      </div>
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
