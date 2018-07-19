import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

// Redux actions
import { toggleEvent } from '../store/modules/schedule';

import EventsList from '../components/Event/List';
import containerStyles from '../utils/_container.module.scss';
import contentStyles from '../utils/_content.module.scss';

const MyDigitecPage = props => {
  const { data, schedule, onToggleEvent } = props;
  const { edges } = data.allMarkdownRemark;

  const events = edges
    .map(({ node: event }) => ({
      id: event.id,
      slug: event.fields.slug,
      title: event.frontmatter.title,
      starts: event.frontmatter.starts,
      ends: event.frontmatter.ends,
      venue: event.frontmatter.venue,
      color: event.frontmatter.color,
      order: event.frontmatter.order,
      readMore: event.frontmatter.readMore,
    }))
    .filter(event => schedule[event.id] || event.register === false);

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
      {events.length > 0 ? (
        <EventsList
          events={events}
          schedule={schedule}
          onToggleEvent={onToggleEvent}
        />
      ) : (
        <p>No events have been selected yet.</p>
      )}
    </section>
  );
};

MyDigitecPage.propTypes = {
  schedule: PropTypes.object,
  onToggleEvent: PropTypes.func,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

MyDigitecPage.defaultProps = {
  schedule: [],
};

function mapStateToProps(state) {
  return {
    schedule: state.schedule,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onToggleEvent: event => {
      dispatch(toggleEvent(event));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyDigitecPage);

export const pageQuery = graphql`
  query MyDigitecQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___starts], order: ASC }
      filter: { fileAbsolutePath: { regex: "/events/" } }
    ) {
      edges {
        node {
          id
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
