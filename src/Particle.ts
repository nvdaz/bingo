const colors = [
  '#a864fd',
  '#29cdff',
  '#78ff44',
  '#ff718d',
  '#fdff6a',
  '#0777fd',
  '##5e4691',
  '#ad2e59',
];

class Particle {
  private color: string;
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private t: number;
  private vx: number;
  private vy: number;
  private vt: number;
  private a: number;
  private s: number;
  private vs: number;
  private ds: number;

  constructor() {
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.x = 0.5;
    this.y = 1 + Math.random() / 2;
    this.width = Math.random() * 7 + 1;
    this.height = Math.random() * 20 + 5;
    this.t = (Math.random() - 0.5) * Math.PI;
    this.vx = -0.5 + Math.random();
    this.vy = -1.25 - Math.random() / 2;
    this.vt = (Math.random() - 0.5) * Math.PI;
    this.a = 1 + Math.random() / 2;
    this.s = Math.random();
    this.vs = Math.random() / 10;
    this.ds = -1;
  }

  public tick(delta: number) {
    this.vy += this.a * delta;
    this.x += this.vx * delta;
    this.y += this.vy * delta;
    this.t += this.vt * delta;

    this.s -= this.vs * this.ds;
    if (this.s < -1 || this.s > 1) {
      this.ds *= -1;
    }

    return (
      this.y * window.innerHeight - this.height > window.innerHeight &&
      this.vy > 0 &&
      this.a >= 0
    );
  }

  public render(ctx: CanvasRenderingContext2D) {
    const cx = this.x * window.innerWidth + this.width / 2;
    const cy = this.y * window.innerHeight + this.height / 2;
    ctx.translate(cx, cy);
    ctx.scale(1, this.s);
    ctx.rotate(this.t);
    ctx.translate(-cx, -cy);
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.x * window.innerWidth,
      this.y * window.innerHeight,
      this.width,
      this.height
    );
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

export default Particle;
