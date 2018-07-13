import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import Content, { HTMLContent } from '../components/Content';

import TeamPage from '../components/Presenters/Team/Page';
import contentStyles from '../utils/_content.module.scss';

export const TeamTemplate = ({
  content,
  contentComponent,
  teamName,
  picture,
  intro,
  twitter,
  events,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <Fragment>
      {helmet || ''}
      <TeamPage
        team={{
          teamName,
          intro,
          picture,
          twitter,
        }}
        events={events}
      >
        <PostContent className={contentStyles.content} content={content} />
      </TeamPage>
    </Fragment>
  );
};

TeamTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  teamName: PropTypes.string,
  intro: PropTypes.string,
  picture: PropTypes.element,
  twitter: PropTypes.string,
  events: PropTypes.array,
  helmet: PropTypes.object,
};

TeamTemplate.defaultProps = {
  contentComponent: null,
  teamName: '',
  intro: '',
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
      intro={node.frontmatter.intro}
      picture={<Img sizes={node.frontmatter.picture.childImageSharp.sizes} />}
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
        intro
        twitter
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
`;
