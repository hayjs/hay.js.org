import * as React from 'react';

import Logo from '../_includes/logo';

export default class Footer extends React.Component<{}, {}> {
  render() {
    return (
      <footer className="footer">
        <div className="footer__background">
          <div className="footer__container">
            <div className="footer__links">
              <span className="footer__link-header">Docs</span>

              <a rel="noopener" href="/docs">Documentation</a>
              <a rel="noopener" href="/get-started">Get Started</a>
              <a rel="noopener" href="/example-project">Example Project</a>
            </div>
            <div className="footer__links">
              <span className="footer__link-header">Source</span>

              <a rel="noopener" target="_blank" href="https://github.com/rynclark/hay">GitHub</a>
              <a rel="noopener" target="_blank" href="https://github.com/rynclark/hay/blob/master/CONTRIBUTING.md">Contribute</a>
              <a rel="noopener" target="_blank" href="https://github.com/rynclark/hay/issues">Issues</a>
              <a rel="noopener" target="_blank" href="https://github.com/rynclark/hay/releases">Change Log</a>
            </div>
            <div className="footer__links">
              <span className="footer__link-header">Other Projects</span>

              <a rel="noopener" target="_blank" href="https://nglr.io">nglr</a>
              <a rel="noopener" target="_blank" href="https://parceljs.com">parceljs</a>
              <a rel="noopener" target="_blank" href="https://github.com/rynclark">rynclark</a>
            </div>
            <div className="footer__logo">
              <a rel="noopener" href="/" className="logo-only">
                <Logo />
              </a>
            </div>
          </div>
          <div className="footer__author">
            by <a rel="noopener" href="https://ryanclark.me" target="_blank">Ryan Clark</a>
          </div>
        </div>
      </footer>
    );
  }
}
