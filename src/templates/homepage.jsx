import React from 'react';
import PropTypes from 'prop-types';

export const HomePageTemplate = ({ image, title, heading, description }) => (
  <section className="section section--gradient">
    <div className="container">
      <div className="section">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="content">
              <div
                className="full-width-image-container margin-top-0"
                style={{ backgroundImage: `url(${image})` }}
              >
                <h2
                  className="has-text-weight-bold is-size-1"
                  style={{
                    boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
                    backgroundColor: '#f40',
                    color: 'white',
                    padding: '1rem',
                  }}
                >
                  {title}
                </h2>
              </div>
              <div className="columns">
                <div className="column is-7">
                  <h3 className="has-text-weight-semibold is-size-2">
                    {heading}
                  </h3>
                  <p>{description}</p>
                </div>
              </div>
            </div>
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
  description: PropTypes.string,
};

const HomePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <HomePageTemplate
      image={frontmatter.image}
      title={frontmatter.title}
      heading={frontmatter.heading}
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
  }),
};

export default HomePage;

export const productPageQuery = graphql`
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image
        heading
        description
      }
    }
  }
`;
