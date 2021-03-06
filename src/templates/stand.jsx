import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';

import Content, { HTMLContent } from '../components/Content';

import StandPage from '../components/Stand/Page';
import contentStyles from '../utils/_content.module.scss';

export const StandTemplate = ({
  content,
  contentComponent,
  title,
  subtitle,
  picture,
  number,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
      {helmet || ''}
      <StandPage
        stand={{
          title,
          subtitle,
          picture,
          number,
        }}
      >
        <PostContent className={contentStyles.content} content={content} />
      </StandPage>
    </>
  );
};

StandTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  picture: PropTypes.element,
  number: PropTypes.number,
  helmet: PropTypes.element,
};

StandTemplate.defaultProps = {
  contentComponent: null,
  title: '',
  subtitle: '',
  picture: null,
  number: '0',
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
      picture={<Img fluid={post.frontmatter.picture.childImageSharp.fluid} />}
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
        picture {
          childImageSharp {
            fluid(maxWidth: 260) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        number
      }
    }
  }
`;
