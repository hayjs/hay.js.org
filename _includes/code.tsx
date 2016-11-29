import * as React from 'react';

export interface CodeProps {
  terminal?: boolean;
}

export default class Code extends React.Component<CodeProps, {}> {
  render() {
    return (
      <table style={ { borderSpacing: '0' } }>
        <tbody>
          <tr>
            <td className="gutter" style={ { textAlign: 'center' } }>
              {
                React.Children.map(this.props.children, (child: React.ReactElement<any>, index: number) => {
                  if (this.props.terminal) {
                    if (child.props['data-gutter']) {
                      return <pre>{ child.props['data-gutter'] }</pre>;
                    }
                    return <pre>&nbsp;</pre>;
                  }
                  return <pre>{ index + 1 }</pre>;
                })
              }
            </td>
            <td className="code">
              { this.props.children }
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
