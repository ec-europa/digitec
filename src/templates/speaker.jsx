import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Content, { HTMLContent } from '../components/Content';

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
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {firstname} {lastname}
            </h1>
            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
              {title}
            </h2>
            <img alt="" src={picture} />
            <PostContent content={content} />
          </div>
        </div>
      </div>
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
  helmet: '',
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
