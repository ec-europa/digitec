import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import TeamCard from '../components/Presenters/Team/Card';

import containerStyles from '../utils/_container.module.scss';
import contentStyles from '../utils/_content.module.scss';

const TeamsPage = props => {
  const { data } = props;
  const { edges: teams } = data.allMarkdownRemark;

  return (
    <section className={containerStyles.container}>
      <Helmet title="Teams" />
      <h1 className={contentStyles.fs10}>Teams</h1>
      <div className={containerStyles.cardsContainer}>
        {teams.map(({ node: team }) => (
          <TeamCard
            key={team.fields.slug}
            team={{
              slug: team.fields.slug,
              teamName: team.frontmatter.teamName,
              teamMembers: team.frontmatter.teamMembers,
              intro: team.frontmatter.intro,
              picture: team.frontmatter.picture.childImageSharp,
            }}
          />
        ))}
      </div>
    </section>
  );
};

TeamsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

export default TeamsPage;

export const pageQuery = graphql`
  query TeamsQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___teamName], order: ASC }
      filter: { fileAbsolutePath: { regex: "/teams/" } }
    ) {
      edges {
        node {
          html
          fields {
            slug
          }
          frontmatter {
            teamName
            teamMembers
            intro
            picture {
              childImageSharp {
                sizes(maxWidth: 260) {
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
