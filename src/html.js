/* eslint-disable global-require,react/prefer-stateless-function, react/jsx-filename-extension, jsx-a11y/html-has-lang,react/prop-types,no-useless-escape */
import React from 'react';

let stylesStr;
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`);
  } catch (e) {
    console.log(e);
  }
}

module.exports = class HTML extends React.Component {
  render() {
    let css;
    if (process.env.NODE_ENV === `production`) {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      );
    }
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {this.props.headComponents}
          {css}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key="body"
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
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
                  "sitePath": ["europa.eu\/digitec"],
                  "instance": "europa.eu"
              }
            `,
            }}
          />
        </body>
      </html>
    );
  }
};
