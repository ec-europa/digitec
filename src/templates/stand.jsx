import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Content, { HTMLContent } from '../components/Content';

import StandPage from '../components/Stand/Page';
import contentStyles from '../utils/_content.module.scss';

export const StandTemplate = ({
  content,
  contentComponent,
  title,
  subtitle,
  visual,
  number,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <Fragment>
      {helmet || ''}
      <StandPage
        stand={{
          title,
          subtitle,
          visual,
          number,
        }}
      >
        <PostContent className={contentStyles.content} content={content} />
      </StandPage>
    </Fragment>
  );
};

StandTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  visual: PropTypes.string,
  number: PropTypes.string,
  helmet: PropTypes.object,
};

StandTemplate.defaultProps = {
  contentComponent: null,
  title: '',
  subtitle: '',
  visual: '',
  helmet: null,
};

const Stand = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <StandTemplate
      content={post.html}
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      subtitle={post.frontmatter.subtitle}
      visual={post.frontmatter.visual}
      number={post.frontmatter.number}
      helmet={<Helmet title={post.frontmatter.title} />}
    />
  );
};

Stand.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }).isRequired,
};

export default Stand;

export const pageQuery = graphql`
  query StandByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subtitle
        visual
        number
      }
    }
  }
`;
