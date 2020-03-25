/**
 * Creates relationship nodes between speakers and events.
 * Helper will used by Gatsby's sourceNodes API
 * @see https://www.gatsbyjs.org/docs/node-apis/#sourceNodes
 * @param  {function} getNode         The function to get a given node.
 * @param  {function} getNodes        The function to get a list of nodes.
 * @param  {function} createNodeField "Attach" the created node to the Gatsby's build process for content creation.
 * @return {void}
 */
module.exports = ({ getNode, getNodes, createNodeField }) => {
  const eventSpeakers = {};
  const speakerEvents = {}; // reverse index

  // as we can have multiple authors in book we should handle both cases
  // both when author is specified as single item and when there is list of authors
  // abstracting it to helper function help prevent code duplication
  const getSpeakerNodeByName = (speaker) =>
    getNodes().find(
      (node2) =>
        node2.internal.type === 'MarkdownRemark' &&
        node2.frontmatter.lastname === speaker.speaker
    );

  getNodes()
    .filter((node) => node.internal.type === 'MarkdownRemark')
    .forEach((node) => {
      if (node.frontmatter.speakers) {
        const speakersNodes =
          node.frontmatter.speakers instanceof Array
            ? node.frontmatter.speakers.map(getSpeakerNodeByName) // get array of nodes
            : [getSpeakerNodeByName(node.frontmatter.speakers)]; // get single node and create 1 element array

        // filtered not defined nodes and iterate through defined authors nodes to add data to indexes
        speakersNodes
          .filter((speakerNode) => speakerNode)
          .map((speakerNode) => {
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
      name: 'events',
      value: events,
    });
  });

  Object.entries(speakerEvents).forEach(([eventNodeId, speakers]) => {
    createNodeField({
      node: getNode(eventNodeId),
      name: 'speakers',
      value: speakers,
    });
  });
};
