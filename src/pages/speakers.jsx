import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import containerStyles from '../utils/_container.module.scss';
import contentStyles from '../utils/_content.module.scss';

const SpeakersPage = props => {
  const { data } = props;
  const { edges: speakers } = data.allMarkdownRemark;

  return (
    <section className={containerStyles.container}>
      <h1 className={contentStyles.fs9}>Speakers</h1>
      {speakers.map(({ node: speaker }) => (
        <div
          className="content"
          style={{ border: '1px solid #eaecee', padding: '2em 4em' }}
          key={speaker.id}
        >
          <p>
            <Link className="has-text-primary" to={speaker.fields.slug}>
              {speaker.frontmatter.firstname}
              {speaker.frontmatter.lastname}
              {speaker.frontmatter.title}
              <img alt="" src={speaker.frontmatter.picture} />
            </Link>
          </p>
        </div>
      ))}
    </section>
  );
};

SpeakersPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export default SpeakersPage;

export const pageQuery = graphql`
  query SpeakersQuery {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/speakers/" } }) {
      edges {
        node {
          html
          id
          fields {
            slug
          }
          frontmatter {
            id
            firstname
            lastname
            picture
            title
          }
        }
      }
    }
  }
`;
