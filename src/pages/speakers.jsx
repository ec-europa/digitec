import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SpeakerCard from '../components/Speaker/Card';

import containerStyles from '../utils/_container.module.scss';
import contentStyles from '../utils/_content.module.scss';

const SpeakersPage = props => {
  const { data } = props;
  const { edges: speakers } = data.allMarkdownRemark;

  return (
    <Layout location={props.location}>
      <section className={containerStyles.container}>
        <Helmet title="Speakers" />
        <h1 className={contentStyles.fs9}>Speakers</h1>
        <div className={containerStyles.cardsContainer}>
          {speakers.map(({ node: speaker }) => (
            <SpeakerCard
              key={speaker.fields.slug}
              speaker={{
                slug: speaker.fields.slug,
                firstname: speaker.frontmatter.firstname,
                lastname: speaker.frontmatter.lastname,
                picture: speaker.frontmatter.picture.childImageSharp,
                title: speaker.frontmatter.title,
              }}
            />
          ))}
        </div>
      </section>
    </Layout>
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___lastname], order: ASC }
      filter: { fileAbsolutePath: { regex: "/speakers/" } }
    ) {
      edges {
        node {
          html
          fields {
            slug
          }
          frontmatter {
            firstname
            lastname
            picture {
              childImageSharp {
                fluid(maxWidth: 260) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            title
          }
        }
      }
    }
  }
`;
