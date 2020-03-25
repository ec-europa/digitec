import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';

// Redux actions
import { toggleEvent } from '../store/modules/schedule';

import EventsList from '../components/Event/List';
import containerStyles from '../utils/_container.module.scss';
import contentStyles from '../utils/_content.module.scss';

const ProgrammePage = (props) => {
  const { data, schedule, onToggleEvent } = props;
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

  return (
    <section className={containerStyles.container}>
      <Helmet title="Programme" />
      <div className={containerStyles.header}>
        <h1 className={contentStyles.fs10}>Programme</h1>
      </div>
      <div className={contentStyles.intro}>
        <p>
          Choose and save your favourite sessions to{' '}
          <Link to="/my-digitec">My DIGITEC</Link>.
        </p>
      </div>
      <EventsList
        events={mappedEvents}
        onToggleEvent={onToggleEvent}
        schedule={schedule}
      />
    </section>
  );
};

ProgrammePage.propTypes = {
  schedule: PropTypes.object,
  onToggleEvent: PropTypes.func.isRequired,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
};

ProgrammePage.defaultProps = {
  schedule: [],
};

export const pageQuery = graphql`
  query ProgrammeQuery {
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

function mapStateToProps(state) {
  return {
    schedule: state.schedule,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onToggleEvent: (event) => {
      dispatch(toggleEvent(event));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgrammePage);
