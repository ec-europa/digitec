import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Content, { HTMLContent } from '../components/Content';

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
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
              {starts} - {ends} | {venue}
            </h2>
            <PostContent content={content} />
          </div>
        </div>
      </div>
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
  helmet: '',
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
