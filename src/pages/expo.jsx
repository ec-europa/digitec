import React from 'react';
import PropTypes from 'prop-types';

import StandCard from '../components/Stand/Card';

import containerStyles from '../utils/_container.module.scss';
import contentStyles from '../utils/_content.module.scss';

const StandsPage = props => {
  const { data } = props;
  const { edges: stands } = data.allMarkdownRemark;

  return (
    <section className={containerStyles.container}>
      <h1 className={contentStyles.fs9}>Expo</h1>
      <div style={{ display: 'flex' }}>
        {stands.map(({ node: stand }) => (
          <StandCard stand={{
            slug: stand.fields.slug,
            title: stand.frontmatter.title,
            subtitle: stand.frontmatter.subtitle,
            visual: stand.frontmatter.visual,
            number: stand.frontmatter.number
          }} />
        ))}
      </div>
    </section>
  );
};

StandsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export default StandsPage;

export const pageQuery = graphql`
  query StandsQuery {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/stands/" } }) {
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
            subtitle
            visual
            number
          }
        }
      }
    }
  }
`;
