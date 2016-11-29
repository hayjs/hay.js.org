import * as React from 'react';

export interface AMPProps {
  content: React.ReactChildren;
  options: {
    canonical: string
  }
}

export default class DefaultPage extends React.Component<AMPProps, {}> {
  render() {
    return (
      <html amp="">
        <head>
          <meta charSet="utf-8" />
          <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
          <meta name="theme-color" content="#20252c" />

          <title>hay</title>
          <link rel="canonical" href={ this.props.options.canonical } />
          <link rel="manifest" href="/manifest.json" />
          <link rel="stylesheet" href="https://cloud.typography.com/7275356/6039172/css/fonts.css" />

          <style amp-custom="">
            {
              `
                html, body {
                  font: 18px/31px PT Sans, Helvetica Neue, Helvetica, Arial, sans-serif;
                }
                body {
                  background: rgba(0, 0, 0, 0.05);
                  color: #444444;
                }
              `.replace(/\s\s+/g, ' ')
            }
          </style>
          <style amp-boilerplate="">
            {
              'body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}'
            }
          </style>
          <noscript>
            <style amp-boilerplate="">
              {
                'body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}'
              }
            </style>
          </noscript>
        </head>
        <body>
          { this.props.content }
        </body>
      </html>
    );
  }
}
