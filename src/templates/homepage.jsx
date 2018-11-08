import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
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
            sizes={bigLogo.sizes}
            style={{
              margin: '4rem auto 1rem',
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

const HomePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  const { bigLogo } = data;

  return (
    <HomePageTemplate
      content={data.markdownRemark.html}
      contentComponent={HTMLContent}
      image={frontmatter.image}
      bigLogo={bigLogo}
      title={frontmatter.title}
      heading={frontmatter.heading}
      hashtag={frontmatter.hashtag}
    />
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
            sizes(maxWidth: 1920, quality: 80) {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
        heading
        hashtag
      }
    }
    bigLogo: imageSharp(id: { regex: "/DIGITEC-2018_3-institutions.png/" }) {
      sizes(maxWidth: 600, quality: 80) {
        ...GatsbyImageSharpSizes_withWebp_noBase64
      }
    }
  }
`;
