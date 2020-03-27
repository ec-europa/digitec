/* eslint-disable global-require, react/jsx-filename-extension, react/prop-types */
const React = require('react');

const html = ({
  htmlAttributes,
  headComponents,
  bodyAttributes,
  preBodyComponents,
  postBodyComponents,
  body,
}) => {
  let css;

  return (
    <html lang="en" {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {headComponents}
        {css}
        <script
          src="https://ec.europa.eu/wel/cookie-consent/consent.js"
          type="text/javascript"
          defer
        />
      </head>
      <body {...bodyAttributes}>
        {preBodyComponents}
        <div
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {postBodyComponents}
        <script
          defer
          src="//europa.eu/webtools/load.js"
          type="text/javascript"
        />
        <script
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                  "utility": "piwik",
                  "siteID": 101,
                  "sitePath": ["europa.eu/digitec/2018"],
                  "instance": "europa.eu"
              }
            `,
          }}
        />
      </body>
    </html>
  );
};

module.exports = html;
