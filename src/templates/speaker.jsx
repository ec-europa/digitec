import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Content, { HTMLContent } from '../components/Content';

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
  );
};

SpeakerTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  title: PropTypes.string,
  picture: PropTypes.string,
  twitter: PropTypes.string,
  events: PropTypes.array,
  helmet: PropTypes.instanceOf(Helmet),
};

SpeakerTemplate.defaultProps = {
  contentComponent: null,
  firstname: '',
  lastname: '',
  title: '',
  picture: '',
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
      picture={post.frontmatter.picture}
      twitter={post.frontmatter.twitter}
      events={post.fields.events}
      helmet={
        <Helmet
          title={`${post.frontmatter.firstname} ${
            post.frontmatter.lastname
          } | Speakers`}
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
      id
      html
      fields {
        events {
          id
          fields {
            slug
          }
          frontmatter {
            title
            starts
            ends
            venue
            color
          }
        }
      }
      frontmatter {
        firstname
        lastname
        title
        twitter
        picture
      }
    }
  }
`;
