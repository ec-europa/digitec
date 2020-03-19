const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const createSpeakersEvents = require('./createNodes/speakersEvents');
const createTeamsEvents = require('./createNodes/teamsEvents');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors); // eslint-disable-line
    }

    const posts = result.data.allMarkdownRemark.edges;

    return posts.forEach(edge => {
      const { id } = edge.node;
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.jsx`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    // Make paths relative
    ['picture', 'image'].forEach(prop => {
      if (node.frontmatter[prop]) {
        // eslint-disable-next-line no-param-reassign
        node.frontmatter[prop] = `../../static${node.frontmatter[prop]}`;
      }
    });

    // Add slug field
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

// Map Speakers and Teams to Events
// As discussed here: https://github.com/gatsbyjs/gatsby/issues/3129#issuecomment-365308599
exports.sourceNodes = ({ actions, getNodes, getNode }) => {
  const { createNodeField } = actions;

  createSpeakersEvents({ getNode, getNodes, createNodeField });
  createTeamsEvents({ getNode, getNodes, createNodeField });
};
