

class Circle extends Shape {
  constructor(x,y, radius) {
    super(x,y);
    this.radius = radius;
  }
  getBounds() {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    };
  }
  
  render(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.scaleX, this.scaleY);
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    //x, y, radius, start_angle, end_angle, anti-clockwise
    ctx.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
    ctx.closePath();
    ctx.fill();
    if (this.lineWidth > 0) {
      ctx.stroke();
    }
    ctx.restore();
  }
}