import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

import EventsList from '../components/Event/List';
import containerStyles from '../utils/_container.module.scss';
import contentStyles from '../utils/_content.module.scss';

const MyDigitecPage = props => {
  const { data } = props;
  const { edges: events } = data.allMarkdownRemark;

  const mappedEvents = events.map(({ node: event }) => ({
    id: event.id,
    slug: event.fields.slug,
    title: event.frontmatter.title,
    starts: event.frontmatter.starts,
    ends: event.frontmatter.ends,
    venue: event.frontmatter.venue,
    color: event.frontmatter.color,
    order: event.frontmatter.order,
    readMore: event.frontmatter.readMore,
  }));

  // const { schedule, mappedEvents, onToggleEvent, location } = props;

  return (
    <section className={containerStyles.container}>
      <Helmet title="My DIGITEC" />
      <div className={containerStyles.header}>
        <h1 className={contentStyles.fs10}>My DIGITEC</h1>
      </div>
      <div className={containerStyles.intro}>
        <p>
          &quot;My DIGITEC&quot; helps you personalise your experience. Select
          your favourite sessions from{' '}
          <Link to="/programme">DIGITEC programme</Link>
          .
        </p>
      </div>
      {mappedEvents.length > 0 && (
        <EventsList
          events={mappedEvents}
          // schedule={schedule}
          // onToggle={onToggleEvent}
          // location={location}
        />
      )}
    </section>
  );
};

MyDigitecPage.propTypes = {
  schedule: PropTypes.object,
  mappedEvents: PropTypes.array,
  onToggleEvent: PropTypes.func,
  location: PropTypes.object,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

MyDigitecPage.defaultProps = {
  schedule: [],
};

export default MyDigitecPage;

export const pageQuery = graphql`
  query MyDigitecQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___starts], order: ASC }
      filter: {
        fileAbsolutePath: { regex: "/events/" }
        frontmatter: { register: { eq: false } }
      }
    ) {
      edges {
        node {
          html
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
            order
          }
        }
      }
    }
  }
`;
