import * as React from 'react';

export default class Console extends React.Component<{}, { activeTab: string }> {
  private tabs: string[] = [];

  constructor(props) {
    super(props);

    React.Children.forEach(this.props.children, (child: React.ReactElement<any>) => {
      if (child.props['data-tab']) {
        this.tabs.push(child.props['data-tab'])
      }
    });

    this.state = {
      activeTab: this.tabs[0]
    };
  }

  render() {
    return (
      <div className="console">
        <header className="console__header">
          <span className="console__header__buttons">
            <span className="console__header__button console__header__button--red"></span>
            <span className="console__header__button console__header__button--yellow"></span>
            <span className="console__header__button console__header__button--green"></span>
          </span>

          hay
        </header>
        {
          this.tabs ?
          <div className="file-name">
            {
              this.tabs.map((tab) => {
                let classNames = ['file-name__file'];
                if (this.state.activeTab === tab) {
                  classNames.push('file-name__file--active');
                }
                return (
                  <span className={ classNames.join(' ') }
                        key={ tab }
                        onClick={ () => this.setState((state) => { return Object.assign({}, state, { activeTab: tab }); }) }>
                    { tab }
                  </span>
                );
              })
            }
          </div>
          :
          null
        }
        {
          React.Children.map(this.props.children, (child: React.ReactElement<any>) => {
            if (this.state.activeTab === child.props['data-tab']) {
              return child;
            }
            return null;
          })
        }
      </div>
    );
  }
}
