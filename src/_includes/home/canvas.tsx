import * as React from 'react';
import * as ReactDOM from 'react-dom';

class Particle {
  public x: number = Math.random() * (this.cw / this.pixelRatio);
  public y: number = Math.random() * (this.ch / this.pixelRatio);

  private velocity: { x: number, y: number } = {
    y: (Math.random() - 0.5) * 0.7,
    x: (Math.random() - 0.5) * 0.7
  };

  constructor(private cw: number,
              private ch: number,
              private pixelRatio: number,
              private ctx: CanvasRenderingContext2D) {
  }

  public render() {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#fff';
    this.ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  public update() {
    if (this.x > (this.cw / this.pixelRatio) + 3 || this.x < -3) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y > (this.ch / this.pixelRatio) + 3 || this.y < -3) {
      this.velocity.y = -this.velocity.y;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

class Network {
  private particles: Particle[] = [];

  constructor(private ctx: CanvasRenderingContext2D,
              private cw: number,
              private ch: number,
              private pixelRatio: number) {
    const density: number = Math.floor(ch / 4);

    for (var i = 0; i < density; i++) {
      this.particles.push(
        new Particle(cw, ch, pixelRatio, ctx)
      );
    }

    requestAnimationFrame(() => this.render());
  }

  public render() {
    this.ctx.globalAlpha = 1;
    this.ctx.clearRect(0, 0, this.cw, this.ch);

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].render();

      for (let r = this.particles.length - 1; r > i; r--) {
        const distance: number = Math.sqrt(
          Math.pow(this.particles[i].x - this.particles[r].x, 2)
          + Math.pow(this.particles[i].y - this.particles[r].y, 2)
        );

        if (distance > 100) {
          continue;
        }

        let width: number;
        if (1 > 1000 / (distance * distance)) {
          width = 1000 / (distance * distance);
        } else {
          width = 1.7;
        }

        this.ctx.lineWidth = width;
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#fff';
        this.ctx.moveTo(this.particles[i].x - 1, this.particles[i].y + 1);
        this.ctx.lineTo(this.particles[r].x + 1, this.particles[r].y - 1);
        this.ctx.stroke();
      }
    }
    this.ctx.closePath();

    requestAnimationFrame(() => this.render());
  }
}

export default class Canvas extends React.Component<{}, {}> {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private ch: number;
  private cw: number;
  private pixelRatio: number;

  public componentDidMount() {
    this.canvas = ReactDOM.findDOMNode<HTMLCanvasElement>(this);
    this.ctx = this.canvas.getContext('2d');

    this.resizeCanvas();

    new Network(this.ctx, this.cw, this.ch, this.pixelRatio);

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas() {
    this.pixelRatio = window.devicePixelRatio || 1;

    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;

    this.canvas.style.width = this.canvas.width + 'px';
    this.canvas.style.height = this.canvas.height + 'px';
    this.canvas.width *= this.pixelRatio;
    this.canvas.height *= this.pixelRatio;

    this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);

    this.cw = this.canvas.width;
    this.ch = this.canvas.height;
  }

  public render() {
    return <canvas />;
  }
}
