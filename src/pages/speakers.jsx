import React from 'react';
import PropTypes from 'prop-types';

import SpeakerCard from '../components/Speaker/Card';

import containerStyles from '../utils/_container.module.scss';
import contentStyles from '../utils/_content.module.scss';

const SpeakersPage = props => {
  const { data } = props;
  const { edges: speakers } = data.allMarkdownRemark;

  return (
    <section className={containerStyles.container}>
      <h1 className={contentStyles.fs9}>Speakers</h1>
      <div
        style={{ display: 'flex' }}
      >
        {speakers.map(({ node: speaker }) => (
          <SpeakerCard speaker={{
            slug: speaker.fields.slug,
            firstname: speaker.frontmatter.firstname,
            lastname: speaker.frontmatter.lastname,
            picture: speaker.frontmatter.picture,
            title: speaker.frontmatter.title
          }} />
        ))}
      </div>
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
