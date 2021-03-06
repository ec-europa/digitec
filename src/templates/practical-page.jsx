import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Content, { HTMLContent } from '../components/Content';

import containerStyles from '../utils/_container.module.scss';
import contentStyles from '../utils/_content.module.scss';

export const PracticalPageTemplate = ({ title, content, contentComponent }) => {
  const PostContent = contentComponent || Content;

  return (
    <section className={containerStyles.container}>
      <Helmet title={title} />
      <h1 className={contentStyles.fs10}>{title}</h1>
      <PostContent className={contentStyles.content} content={content} />
    </section>
  );
};

PracticalPageTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
};

const Practical = ({ data }) => {
  const { markdownRemark: post } = data;
  const { frontmatter } = data.markdownRemark;

  return (
    <PracticalPageTemplate
      content={post.html}
      contentComponent={HTMLContent}
      title={frontmatter.title}
    />
  );
};

Practical.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }).isRequired,
};

export default Practical;

export const query = graphql`
  query Practical($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
