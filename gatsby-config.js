const config = require('./config.json');

module.exports = {
  pathPrefix: '/digitec',
  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    siteUrl: config.siteUrl,
    pathPrefix: config.pathPrefix,
  },
  plugins: [
    `gatsby-plugin-react-next`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'DIGITEC 2018',
        short_name: 'DIGITEC',
        start_url: '/digitec',
        background_color: '#fcfdfd',
        theme_color: '#009ee2',
        display: 'minimal-ui',
        icon: 'src/img/favicon-196.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: '#009ee2',
        showSpinner: true,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data`,
        name: 'data',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    // Resolve static images in order to apply sharp transformations
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'static-images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 400,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
  mapping: {
    'MarkdownRemark.fields.speakers': `MarkdownRemark`,
    'MarkdownRemark.fields.events': `MarkdownRemark`,
  },
};
