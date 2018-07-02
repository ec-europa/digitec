import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import Content, { HTMLContent } from '../components/Content';

import Cover from '../components/Cover/Cover';
import contentStyles from '../utils/_content.module.scss';

export const HomePageTemplate = ({
  image,
  title,
  heading,
  hashtag,
  content,
  contentComponent,
  bigLogo,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <Fragment>
      <Cover image={image} title={title} heading={heading} hashtag={hashtag} />
      <div
        style={{ maxWidth: '56rem', margin: '4rem auto', padding: '0 1rem' }}
      >
        <PostContent className={contentStyles.contentBig} content={content} />
        {bigLogo && (
          <Img
            fluid={bigLogo.fluid}
            style={{
              margin: '4rem auto',
              width: '100%',
              maxWidth: '600px',
            }}
          />
        )}
      </div>
    </Fragment>
  );
};

HomePageTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.string,
  heading: PropTypes.string,
  hashtag: PropTypes.string,
};

HomePageTemplate.defaultProps = {
  image: '',
  title: '',
  heading: '',
  hashtag: '',
};

const HomePage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;
  const { bigLogo } = data;

  return (
    <Layout location={location}>
      <HomePageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        image={frontmatter.image}
        bigLogo={bigLogo}
        title={frontmatter.title}
        heading={frontmatter.heading}
        hashtag={frontmatter.hashtag}
        intro={frontmatter.intro}
        location={location}
      />
    </Layout>
  );
};

HomePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }).isRequired,
};

export default HomePage;

export const productPageQuery = graphql`
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        heading
        hashtag
      }
    }
    bigLogo: imageSharp(id: { regex: "/DIGITEC-2018_3-institutions.png/" }) {
      fluid(maxWidth: 600, quality: 80) {
        ...GatsbyImageSharpFluid_withWebp_noBase64
      }
    }
  }
`;
