import * as React from 'react';

export interface DefaultPageProps {
  options: {
    amphtml: string
  },
  content: React.ReactChildren
}

export default class DefaultPage extends React.Component<DefaultPageProps, {}> {
  render() {
    return (
      <html>
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#20252c" />

          <title>hay</title>

          <link rel="amphtml" href={ this.props.options.amphtml } />
          <link rel="manifest" href="/manifest.json" />
          <link rel="stylesheet" href="https://cloud.typography.com/7275356/6039172/css/fonts.css" />
          <link rel="stylesheet" href="css/main.css" />
        </head>
        <body>
          { this.props.content }
        </body>
      </html>
    );
  }
}
