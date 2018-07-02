const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

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

  if (node.internal.type === `MarkdownRemark`) {
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
      name: `slug`,
      node,
      value,
    });
  }
};

// Map Speakers <-> Events
// As discussed here: https://github.com/gatsbyjs/gatsby/issues/3129#issuecomment-365308599
exports.sourceNodes = ({ actions, getNodes, getNode }) => {
  const { createNodeField } = actions;

  const eventSpeakers = {};
  const speakerEvents = {}; // reverse index

  // as we can have multiple authors in book we should handle both cases
  // both when author is specified as single item and when there is list of authors
  // abstracting it to helper function help prevent code duplication
  const getSpeakerNodeByName = speaker =>
    getNodes().find(
      node2 =>
        node2.internal.type === `MarkdownRemark` &&
        node2.frontmatter.lastname === speaker.speaker
    );

  getNodes()
    .filter(node => node.internal.type === `MarkdownRemark`)
    .forEach(node => {
      if (node.frontmatter.speakers) {
        const speakersNodes =
          node.frontmatter.speakers instanceof Array
            ? node.frontmatter.speakers.map(getSpeakerNodeByName) // get array of nodes
            : [getSpeakerNodeByName(node.frontmatter.speakers)]; // get single node and create 1 element array

        // filtered not defined nodes and iterate through defined authors nodes to add data to indexes
        speakersNodes.filter(speakerNode => speakerNode).map(speakerNode => {
          // if it's first time for this author init empty array for his books
          if (!(speakerNode.id in eventSpeakers)) {
            eventSpeakers[speakerNode.id] = [];
          }
          // add book to this author
          eventSpeakers[speakerNode.id].push(node.id);

          // if it's first time for this book init empty array for its authors
          if (!(node.id in speakerEvents)) {
            speakerEvents[node.id] = [];
          }

          // add author to this book
          return speakerEvents[node.id].push(speakerNode.id);
        });
      }
    });

  Object.entries(eventSpeakers).forEach(([speakerNodeId, events]) => {
    createNodeField({
      node: getNode(speakerNodeId),
      name: `events`,
      value: events,
    });
  });

  Object.entries(speakerEvents).forEach(([eventNodeId, speakers]) => {
    createNodeField({
      node: getNode(eventNodeId),
      name: `speakers`,
      value: speakers,
    });
  });
};
