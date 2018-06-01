import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Content, { HTMLContent } from '../components/Content';

import EventPage from '../components/Event/Page';
import contentStyles from '../utils/_content.module.scss';

export const EventTemplate = ({
  content,
  contentComponent,
  title,
  starts,
  ends,
  venue,
  speakers,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <Fragment>
      {helmet || ''}
      <EventPage
        event={{
          title,
          starts,
          ends,
          venue,
        }}
        speakers={speakers}
      >
        <PostContent className={contentStyles.content} content={content} />
      </EventPage>
    </Fragment>
  );
};

EventTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  starts: PropTypes.string,
  ends: PropTypes.string,
  title: PropTypes.string,
  venue: PropTypes.string,
  speakers: PropTypes.array,
  helmet: PropTypes.object,
};

EventTemplate.defaultProps = {
  contentComponent: null,
  starts: '',
  ends: '',
  title: '',
  venue: '',
  speakers: [],
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
      speakers={post.fields.speakers}
      helmet={<Helmet title={post.frontmatter.title} />}
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
      html
      fields {
        speakers {
          fields {
            slug
          }
          frontmatter {
            firstname
            lastname
            picture {
              childImageSharp {
                sizes(maxWidth: 200) {
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
            title
          }
        }
      }
      frontmatter {
        title
        starts
        ends
        venue
      }
    }
  }
`;
