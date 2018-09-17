import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import SpeakerCard from '../components/Presenters/Speaker/Card';
import TeamCard from '../components/Presenters/Team/Card';

import containerStyles from '../utils/_container.module.scss';
import contentStyles from '../utils/_content.module.scss';

const SpeakersPage = props => {
  const { data } = props;
  const { edges: presenters } = data.allMarkdownRemark;

  const speakers = presenters
    .filter(node => node.node.fields.slug.indexOf('/speakers/') !== -1)
    .sort((a, b) =>
      a.node.frontmatter.lastname.localeCompare(b.node.frontmatter.lastname)
    );

  // const teams = presenters
  //   .filter(node => node.node.fields.slug.indexOf('/teams/') !== -1)
  //   .sort((a, b) =>
  //     a.node.frontmatter.teamName.localeCompare(b.node.frontmatter.teamName)
  //   );

  // Temporarily hide teams on this page.
  const teams = [];

  return (
    <section className={containerStyles.container}>
      <Helmet title="Speakers" />
      <h1 className={contentStyles.fs10}>Speakers</h1>
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
      {teams.length ? (
        <Fragment>
          <h2>Space for Innovation: IT in the EU institutions</h2>
          <div className={containerStyles.cardsContainer}>
            {teams.map(({ node: team }) => (
              <TeamCard
                key={team.fields.slug}
                team={{
                  slug: team.fields.slug,
                  teamName: team.frontmatter.teamName,
                  picture: team.frontmatter.picture.childImageSharp,
                }}
              />
            ))}
          </div>
        </Fragment>
      ) : (
        ''
      )}
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
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/speakers|teams/" } }
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
            title
            teamName
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
