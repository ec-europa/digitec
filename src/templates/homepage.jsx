import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Cover from '../components/Cover/Cover';
import contentStyles from '../utils/_content.module.scss';

export const HomePageTemplate = ({
  image,
  title,
  heading,
  hashtag,
  description,
}) => (
  <Fragment>
    <Cover image={image} title={title} heading={heading} hashtag={hashtag} />
    <div
      className={contentStyles.contentBig}
      style={{ maxWidth: '54rem', margin: '2rem auto', padding: '0 1rem' }}
    >
      <p>{description}</p>
    </div>
  </Fragment>
);

HomePageTemplate.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string,
  heading: PropTypes.string,
  hashtag: PropTypes.string,
  description: PropTypes.string,
};

const HomePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <HomePageTemplate
      image={frontmatter.image.childImageSharp}
      title={frontmatter.title}
      heading={frontmatter.heading}
      hashtag={frontmatter.hashtag}
      description={frontmatter.description}
      intro={frontmatter.intro}
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
      frontmatter {
        title
        image {
          childImageSharp {
            sizes(maxWidth: 1500, rotate: 180) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        heading
        hashtag
        description
      }
    }
  }
`;
