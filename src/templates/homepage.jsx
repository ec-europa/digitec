import React from 'react';
import PropTypes from 'prop-types';

import Cover from '../components/Cover/Cover';

export const HomePageTemplate = ({
  image,
  title,
  heading,
  hashtag,
  description,
}) => (
  <section className="section section--gradient">
    <Cover image={image} title={title} heading={heading} hashtag={hashtag} />
    <div className="container">
      <div className="section">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

HomePageTemplate.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  heading: PropTypes.string,
  hashtag: PropTypes.string,
  description: PropTypes.string,
};

const HomePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <HomePageTemplate
      image={frontmatter.image}
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
        image
        heading
        hashtag
        description
      }
    }
  }
`;
