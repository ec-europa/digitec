import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';

import Content, { HTMLContent } from '../components/Content';

import TeamPage from '../components/Presenters/Team/Page';
import contentStyles from '../utils/_content.module.scss';

export const TeamTemplate = ({
  content,
  contentComponent,
  teamName,
  teamMembers,
  picture,
  twitter,
  events,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
      {helmet || ''}
      <TeamPage
        team={{
          teamName,
          teamMembers,
          picture,
          twitter,
        }}
        events={events}
      >
        <PostContent className={contentStyles.content} content={content} />
      </TeamPage>
    </>
  );
};

TeamTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  teamName: PropTypes.string,
  teamMembers: PropTypes.string,
  picture: PropTypes.element,
  twitter: PropTypes.string,
  events: PropTypes.array,
  helmet: PropTypes.object,
};

TeamTemplate.defaultProps = {
  contentComponent: null,
  teamName: '',
  teamMembers: '',
  picture: null,
  twitter: '',
  events: [],
  helmet: null,
};

const Team = ({ data }) => {
  const { markdownRemark: node } = data;

  return (
    <TeamTemplate
      content={node.html}
      contentComponent={HTMLContent}
      teamName={node.frontmatter.teamName}
      teamMembers={node.frontmatter.teamMembers}
      picture={<Img fluid={node.frontmatter.picture.childImageSharp.fluid} />}
      twitter={node.frontmatter.twitter}
      events={node.fields.events}
      helmet={<Helmet title={`${node.frontmatter.teamName}`} />}
    />
  );
};

Team.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }).isRequired,
};

export default Team;

export const pageQuery = graphql`
  query TeamWithEventsByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        events {
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
          }
        }
      }
      frontmatter {
        teamName
        teamMembers
        twitter
        picture {
          childImageSharp {
            fluid(maxWidth: 260) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
