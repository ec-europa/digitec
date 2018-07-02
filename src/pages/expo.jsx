import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import StandCard from '../components/Stand/Card';

import containerStyles from '../utils/_container.module.scss';
import contentStyles from '../utils/_content.module.scss';

const StandsPage = props => {
  const { data } = props;
  const { edges: stands } = data.allMarkdownRemark;

  return (
    <Layout location={props.location}>
      <section className={containerStyles.container}>
        <Helmet title="Expo" />
        <h1 className={contentStyles.fs9}>Expo</h1>
        <div className={containerStyles.cardsContainer}>
          {stands.map(({ node: stand }) => (
            <StandCard
              key={stand.fields.slug}
              stand={{
                slug: stand.fields.slug,
                title: stand.frontmatter.title,
                subtitle: stand.frontmatter.subtitle,
                picture: stand.frontmatter.picture.childImageSharp,
                number: stand.frontmatter.number,
              }}
            />
          ))}
        </div>
      </section>
    </Layout>
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
          fields {
            slug
          }
          frontmatter {
            title
            subtitle
            picture {
              childImageSharp {
                fluid(maxWidth: 260) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            number
          }
        }
      }
    }
  }
`;
