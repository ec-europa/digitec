import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Content, { HTMLContent } from '../components/Content';

import containerStyles from '../utils/_container.module.scss';
import contentStyles from '../utils/_content.module.scss';

export const SpeakerTemplate = ({
  content,
  contentComponent,
  firstname,
  lastname,
  picture,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className={containerStyles.container}>
      {helmet || ''}
      <h1 className={contentStyles.fs9}>
        {firstname} {lastname}
      </h1>
      <h2 className={contentStyles.fs7}>{title}</h2>
      <img alt="" src={picture} />
      <PostContent className={contentStyles.content} content={content} />
    </section>
  );
};

SpeakerTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  title: PropTypes.string,
  picture: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet),
};

SpeakerTemplate.defaultProps = {
  contentComponent: null,
  firstname: '',
  lastname: '',
  title: '',
  picture: '',
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
  query SpeakerByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        firstname
        lastname
        title
        picture
      }
    }
  }
`;
