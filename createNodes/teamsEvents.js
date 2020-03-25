/**
 * Creates relationship nodes between teams and events.
 * Helper will used by Gatsby's sourceNodes API
 * @see https://www.gatsbyjs.org/docs/node-apis/#sourceNodes
 * @param  {function} getNode         The function to get a given node.
 * @param  {function} getNodes        The function to get a list of nodes.
 * @param  {function} createNodeField "Attach" the created node to the Gatsby's build process for content creation.
 * @return {void}
 */
module.exports = ({ getNode, getNodes, createNodeField }) => {
  const eventTeams = {};
  const teamEvents = {}; // reverse index

  const getTeamNodeByName = (team) => {
    let teamNode = null;

    getNodes().forEach((node) => {
      if (
        node.internal.type === 'MarkdownRemark' &&
        node.frontmatter.teamName &&
        node.frontmatter.teamName.trim() === team.team.trim()
      ) {
        teamNode = node;
      }
    });

    return teamNode;
  };

  getNodes()
    .filter((node) => node.internal.type === 'MarkdownRemark')
    .forEach((node) => {
      if (node.frontmatter.teams) {
        const teamsNodes = node.frontmatter.teams.map(getTeamNodeByName);

        teamsNodes
          .filter((teamNode) => teamNode)
          .map((teamNode) => {
            if (!(teamNode.id in eventTeams)) {
              eventTeams[teamNode.id] = [];
            }

            eventTeams[teamNode.id].push(node.id);

            if (!(node.id in teamEvents)) {
              teamEvents[node.id] = [];
            }

            return teamEvents[node.id].push(teamNode.id);
          });
      }
    });

  Object.entries(eventTeams).forEach(([teamNodeId, events]) => {
    createNodeField({
      node: getNode(teamNodeId),
      name: 'events',
      value: events,
    });
  });

  Object.entries(teamEvents).forEach(([eventNodeId, teams]) => {
    createNodeField({
      node: getNode(eventNodeId),
      name: 'teams',
      value: teams,
    });
  });
};
