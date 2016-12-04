import * as React from 'react';

import Logo from '../logo';
import Canvas from './canvas';
import gradients from './gradients';

type Gradient = {
  name: string,
  colors: string[]
};

export interface LandingState {
  gradient: Gradient;
  logoColors: string[];
}

function invertColor(hexTripletColor: string): string {
  const color: string = hexTripletColor.substring(1);
  return `#${('000000' + (0xFFFFFF ^ parseInt(color, 16)).toString(16)).slice(-6)}`;
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function pickHex(color1: number[], color2: number[], weight: number): number[] {
  const w1: number = ((weight * 2 - 1)/1+1) / 2;
  var w2 = 1 - w1;
  var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2)];
  return rgb;
}

function hexToRgb(hex: string): number[] {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [];
}

export default class Landing extends React.Component<{}, LandingState> {
  constructor(props) {
    super(props);

    this.state = {
      gradient: { name: '', colors: [] },
      logoColors: []
    };

  }

  componentDidMount() {
    this.setState((state) => {
      state.gradient = gradients[Math.floor(Math.random()*gradients.length)];

      let logoColors: string[] = [];

      const { colors } = state.gradient;

      for (let i = 0; i < 7; i++) {
        const hex: number[] = pickHex(
          hexToRgb(colors[0]),
          hexToRgb(colors[colors.length - 1]),
          ((100 / 7) * i) / 100
        );

        logoColors.push(invertColor(rgbToHex.apply(null, hex)));
      }

      state.logoColors = logoColors;

      return state;
    });
  }

  render() {
    return (
      <section className="landing">
        <div className="landing__background">
        </div>
        <div className="landing__network" style={ { background: `linear-gradient(to top left, ${this.state.gradient.colors.join(',')})` } }>
          <Canvas />
        </div>

        <div className="landing__content">
          <header className="landing__header">
            <div className="landing__logo-container">
              <a rel="noopener" href="/" className="logo logo--big">
                <Logo includeText={ true } colors={ this.state.logoColors } />
              </a>
            </div>
            <h3>simple static website builder</h3>
          </header>
          <div>
            <nav className="navigation">
              <ul className="navigation__list">
                <li className="navigation__item">
                  <a rel="noopener" href="/docs" className="navigation__link">
                    Docs
                  </a>
                </li>
                <li className="navigation__item">
                <a rel="noopener" target="_blank" href="https://github.com/hayjs/hay" className="navigation__link">
                  GitHub
                </a>
                </li>
              </ul>
            </nav>
            <div className="console">
              <header className="console__header">
              <span className="console__header__buttons">
                <span className="console__header__button console__header__button--red"></span>
                <span className="console__header__button console__header__button--yellow"></span>
                <span className="console__header__button console__header__button--green"></span>
              </span>
                hay
              </header>
              <table style={ { borderSpacing: 0 } }>
                <tbody>
                <tr>
                  <td className="gutter" style={ { textAlign: 'center' } }>
                    <pre><span className="dollar">$</span></pre>
                    <pre><span className="dollar">$</span></pre>
                    <pre><span className="dollar">$</span></pre>
                    <pre><span className="dollar">$</span></pre>
                  </td>
                  <td className="code">
                    <pre><span className="comment">yarn</span> global add <span className="green">hay</span><span className="dark-blue" style={ { userSelect: 'none' } }> # or npm install -g hay</span></pre>
                    <pre><span className="comment">hay</span> new my-website</pre>
                    <pre><span className="comment">cd</span> my-website</pre>
                    <pre><span className="green bold">hay</span> bale<span style={ { userSelect: 'none' } } className="dark-blue"> # or serve with hay serve</span></pre>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
