import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Content, { HTMLContent } from '../components/Content';

import containerStyles from '../utils/_container.module.scss';
import contentStyles from '../utils/_content.module.scss';

export const EventTemplate = ({
  content,
  contentComponent,
  title,
  starts,
  ends,
  venue,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className={containerStyles.container}>
      {helmet || ''}
      <h1 className={contentStyles.fs9}>{title}</h1>
      <h2 className={contentStyles.fs7}>
        {starts} - {ends} | {venue}
      </h2>
      <PostContent className={contentStyles.content} content={content} />
    </section>
  );
};

EventTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  starts: PropTypes.string,
  ends: PropTypes.string,
  title: PropTypes.string,
  venue: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet),
};

EventTemplate.defaultProps = {
  contentComponent: null,
  starts: '',
  ends: '',
  title: '',
  venue: '',
  helmet: null,
};

const Event = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <EventTemplate
      content={post.html}
      contentComponent={HTMLContent}
      starts={post.frontmatter.starts}
      ends={post.frontmatter.ends}
      venue={post.frontmatter.venue}
      helmet={
        <Helmet
          title={`${post.frontmatter.firstname} ${
            post.frontmatter.lastname
          } | Events`}
        />
      }
      title={post.frontmatter.title}
    />
  );
};

Event.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }).isRequired,
};

export default Event;

export const pageQuery = graphql`
  query EventByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        id
        title
        starts
        ends
        venue
      }
    }
  }
`;
