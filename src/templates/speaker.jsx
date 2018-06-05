import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Content, { HTMLContent } from '../components/Content';
import Img from 'gatsby-image';

import SpeakerPage from '../components/Speaker/Page';
import contentStyles from '../utils/_content.module.scss';

export const SpeakerTemplate = ({
  content,
  contentComponent,
  firstname,
  lastname,
  picture,
  title,
  twitter,
  events,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <Fragment>
      {helmet || ''}
      <SpeakerPage
        speaker={{
          firstname,
          lastname,
          title,
          picture,
          twitter,
        }}
        events={events}
      >
        <PostContent className={contentStyles.content} content={content} />
      </SpeakerPage>
    </Fragment>
  );
};

SpeakerTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  title: PropTypes.string,
  picture: PropTypes.element,
  twitter: PropTypes.string,
  events: PropTypes.array,
  helmet: PropTypes.object,
};

SpeakerTemplate.defaultProps = {
  contentComponent: null,
  firstname: '',
  lastname: '',
  title: '',
  picture: null,
  twitter: '',
  events: [],
  helmet: null,
};

const Speaker = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <SpeakerTemplate
      content={post.html}
      contentComponent={HTMLContent}
      firstname={post.frontmatter.firstname}
      lastname={post.frontmatter.lastname}
      picture={<Img sizes={post.frontmatter.picture.childImageSharp.sizes} />}
      twitter={post.frontmatter.twitter}
      events={post.fields.events}
      helmet={
        <Helmet
          title={`${post.frontmatter.firstname} ${post.frontmatter.lastname}`}
        />
      }
      title={post.frontmatter.title}
    />
  );
};

Speaker.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }).isRequired,
};

export default Speaker;

export const pageQuery = graphql`
  query SpeakerWithEventsByID($id: String!) {
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
        firstname
        lastname
        title
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
