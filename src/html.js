/* eslint-disable global-require,react/prefer-stateless-function, react/jsx-filename-extension, jsx-a11y/html-has-lang,react/prop-types,no-useless-escape */
const React = require('react');

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
    const {
      htmlAttributes,
      headComponents,
      bodyAttributes,
      preBodyComponents,
      postBodyComponents,
      body,
    } = this.props;

    if (process.env.NODE_ENV === 'production') {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      );
    }

    return (
      <html {...htmlAttributes}>
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
                  "sitePath": ["europa.eu\/digitec/2018"],
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
